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

  labourForm: FormGroup = new FormGroup({
    labourPartyName: new FormControl('', [Validators.required]),
    paymentDispenseLimits: new FormControl('', [Validators.required]),
    paymentAcc: new FormControl(null, [Validators.required]),
    labourProfileImg: new FormControl(),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
  });

  id: any;
  isPDF: boolean = false;
  isExcel: boolean = false;
  loader: any;
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

  async ngOnInit() {}

  closeModal() {
    this.labourForm.reset();
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

    this.loader.dismiss();

    this.isGateEntry = true;
  };

  removePicture = async (imgType: any) => {
    this.previewImages[imgType] = '';
  };

  async openFillVoucherPage() {
    // if (!this.recievingDetails.voucher) {
    //   this.loader.present();
    //   const voucherNo = await this.recievingsService.updVoucherNumber();
    //   await this.recievingsService.updVoucherNumberInRecieving(
    //     this.id,
    //     voucherNo
    //   );
    //   this.loader.dismiss();
    // }
    // this.navCtrl.navigateForward(`main/zmm-voucher/${this.id}`, {
    //   state: { id: this.id },
    // });
    this.isGateEntry = true;
  }

  openFillDeliveryPage() {
    this.navCtrl.navigateForward(`main/voucher/post-delivery/${this.id}`, {
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
      }
    );

    this.loader.dismiss();
  }

  async onSubmit() {
    if (this.labourForm.invalid) {
      this.labourForm.markAllAsTouched();
      return;
    }
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

  dismissModal = async () => {
    this.isSuspended = false;
    this.isGateEntry = false;
    return true;
  };
}
