import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { formatDate } from 'src/app/utils/date-util';
import { RecievingStatus } from 'src/app/utils/enum';
import { NotificationService } from 'src/app/utils/notification';
import { HomeService } from '../home/home.service';
import { ReceivingsService } from '../home/tabs/vendors/receivings.service';
import { RecievingDetailService } from './recieving-detail.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-recieving-detail',
  templateUrl: './recieving-detail.page.html',
  styleUrls: ['./recieving-detail.page.scss'],
})
export class RecievingDetailPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private fileService: FileService,
    private recievingsService: ReceivingsService,
    private loadingController: LoadingController,
    private notification: NotificationService,
    private recievingDetailService: RecievingDetailService,
    public homeService: HomeService
  ) {}


  vehicleForm: FormGroup = new FormGroup({
    driverName: new FormControl('', [Validators.required]),
    driveMblNo: new FormControl('', [Validators.required]),
    driverProfileImg: new FormControl(''),
    vehicleFrontImg: new FormControl(''),
    vehiclePlateImg: new FormControl(''),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
  });

  id: any;
  isPDF: boolean = false;
  isExcel: boolean = false;
  loader: any;
  isFormValid: boolean = false;
  recievingDetails: any = {};
  formatDate = formatDate;
  config = Config;
  showConfirm = false;
  recievingStatus = RecievingStatus;
  isSuspended = false;
  isGateEntry = false;
  dispatchDate: any;
  expDeliveryDate: any;
  gateEntryDate: any;
  timeStamp: any;
  images: any = {
    vehicleFront: {},
    vehicleNumberPlate: {},
    driverFace: {},
  };
  previewImages: any = {
    vehicleFront: '',
    vehicleNumberPlate: '',
    driverFace: '',
  };

  async ionViewWillEnter() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRecievingDetails();
  }

  async ngOnInit() {
  }

  closeModal() {
    this.vehicleForm.reset();
    this.previewImages={
      vehicleFront: '',
      vehicleNumberPlate: '',
      driverFace: '',
    };
    this.isGateEntry = false;
  }

  canDismiss = async () => {
    this.closeModal();
    return true;
  };

  takePicture = async (imgType: any) => {
    this.isGateEntry = false;
    this.images[imgType] = {};

    const image = await Camera.getPhoto({
      quality: 30,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: false,
    });
    this.isGateEntry = true;

    this.loader = await this.loadingController.create({
      message: Config.messages.proccessImg,
    });
    this.loader.present();

    // convert data url to blob
    if (image.dataUrl) {
      this.images[imgType] = await this.fileService.convertDataUrlToFile(
        image.dataUrl,
        `vehicle_${this.recievingDetails?.vehicleNo}_${imgType}`
      );

      const url: string = await this.fileService.uploadFile(
        this.images[imgType],
        `vehicles/${this.recievingDetails?.vehicleNo}/${imgType}`,
        'Vehicle Detail Images'
      );
      this.previewImages[imgType] = url;
    }

    if (
      this.previewImages['driverFace'] != '' &&
      this.previewImages['vehicleFront'] != '' &&
      this.previewImages['vehicleNumberPlate'] != ''
    )
      this.isFormValid = true;

    this.loader.dismiss();
    this.isGateEntry = true;
  };

  removePicture = async (imgType: any) => {
    this.previewImages[imgType] = '';
  };

  openFillVoucherPage() {
    this.navCtrl.navigateForward(`main/zmm-voucher/${this.id}`, {
      state: { id: this.id },
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  openExcel() {
    this.isExcel = true;
  }

  get totalExpense() {
    const data = this.recievingDetails?.voucherData;
    if (!data) {
      return 0;
    }
    return (
      parseFloat(data.dieselExpenseAmount || 0) +
      parseFloat(data.labourExpenseAmount || 0) +
      parseFloat(data.khurakiExpenseAmount || 0) +
      parseFloat(data.freightExpenseAmount || 0) +
      parseFloat(data.tollExpenseAmount || 0) +
      parseFloat(data.repairExpenseAmount || 0) +
      parseFloat(data.otherExpenseAmount || 0)
    );
  }

  async getRecievingDetails() {
    this.loader.present();
    (await this.recievingsService.getRecievingsById(this.id)).docs.map(
      async (recieving: any) => {
        const recievingData = {
          ...recieving.data(),
          id: recieving.id,
          supplier: [],
        };
        

        this.recievingDetails =
          await this.recievingDetailService.formatReceiving(recievingData);

        this.dispatchDate = new Date(
          parseInt(this.recievingDetails?.dispatchDate)
        ).toDateString();

        this.expDeliveryDate = new Date(
          parseInt(this.recievingDetails?.expDeliverDate)
        ).toDateString();

        this.gateEntryDate = new Date(
          parseInt(this.recievingDetails?.gateEntryDate)
        ).toDateString();


        this.timeStamp = new Date(
          parseInt(this.recievingDetails?.voucherData['createdAt'])
        ).toDateString();

      }
    );

    this.loader.dismiss();
  }

  async onSubmit() {
    this.sanitizeMobileNo()

    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      this.notification.showError(Config.messages.fillAllFields);
      return;
    }

    if (this.vehicleForm.controls['driveMblNo'].value.length < 10) {
      this.vehicleForm.controls['driveMblNo'].markAsTouched();
      this.notification.showError(Config.messages.fillAllFields);
      return;
    }

    if (
      this.previewImages['driverFace'] == '' ||
      this.previewImages['vehicleFront'] == '' ||
      this.previewImages['vehicleNumberPlate'] == ''
    ) {
      this.notification.showError(Config.messages.fillAllImages);
      return;
    }

    this.vehicleForm.patchValue({
      driverProfileImg: this.previewImages['driverFace'],
      vehicleFrontImg: this.previewImages['vehicleFront'],
      vehiclePlateImg: this.previewImages['vehicleNumberPlate'],
    });

    this.recievingDetails = {
      ...this.recievingDetails,
      status: RecievingStatus.VehicleArrived,
      vehicleDetails: { ...this.vehicleForm.value },
    };

    await this.recievingDetailService.updRecieving(
      this.id,
      this.recievingDetails
    );

    this.isGateEntry = false;
    this.notification.showSuccess(this.config.messages.savedSuccessfully);
    await this.getRecievingDetails();
  }

  async suspend(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      this.recievingsService.updRecievingStatus(
        this.id,
        RecievingStatus.Suspended
      );
      this.recievingDetails.status = RecievingStatus.Suspended;
      this.loader.dismiss();
      this.notification.showSuccess(this.config.messages.updatedSuccessfully);
    }
    this.isSuspended = false;
  }

  sanitizeMobileNo(){
    const driveMblNo = this.vehicleForm.value.driveMblNo.toString();
    if (typeof driveMblNo === 'string' && driveMblNo.length>10) {
      const sliced = driveMblNo.slice(0, 10);
      this.vehicleForm.patchValue({ driveMblNo: sliced });
    } else {
      console.log('driveMblNo is not a string');
    }
  }

  dismissModal = async () => {

    this.sanitizeMobileNo()

    this.isSuspended = false;
    this.isGateEntry = false;
    return true;
  };
}
