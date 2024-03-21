import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import { Config } from 'src/app/config';
import { formatDate } from '../../utils/date-util';
import { NotificationService } from 'src/app/utils/notification';
import { ShipmentStatus } from 'src/app/utils/enum';
import { HomeService } from '../home/home.service';
import { ShipmentDetailService } from '../shipment-detail/shipment-detail.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/utils/util';
import { FileuploadService } from 'src/app/utils/fileupload';

@Component({
  selector: 'app-post-delivery',
  templateUrl: './post-delivery.page.html',
  styleUrls: ['./post-delivery.page.scss'],
})
export class PostDeliveryPage implements OnInit {
  id: any;
  isPDF: boolean = false;
  isExcel: boolean = false;
  loader: any;
  shipmentDetails: any = {};
  formatDate = formatDate;
  config = Config;
  showConfirm = false;
  shipmentStatus = ShipmentStatus;
  isCompleted: boolean = false;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private shipmentService: ShipmentsService,
    private loadingController: LoadingController,
    private notification: NotificationService,
    private shipmentDetailService: ShipmentDetailService,
    public homeService: HomeService,
    private utilService: UtilService,
    private fileuploadService: FileuploadService
  ) { }

  postDeliveryForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    cashExpenseAmount: new FormControl('', [Validators.required]),
    tollExpenseAmount: new FormControl('', [Validators.required]),
    invoiceAck: new FormControl('', [Validators.required]),
    mlrAck: new FormControl('', [Validators.required]),
    remark: new FormControl('', []),
    endOdometer: new FormControl('', [Validators.required]),
    createdAt: new FormControl('', []),
    createdById: new FormControl('', []),
    createdByName: new FormControl('', []),
  });

  async ionViewWillEnter() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getShipmentDetails();
  }

  async ngOnInit() {

  }

  get createdAt() {
    const data = this.postDeliveryForm.value;
    return formatDate(data.createdAt, 'dd MMM YYYY');
  }

  get createdByName() {
    const data = this.postDeliveryForm.value;
    return data.createdByName;
  }

  goBack() {
    this.navCtrl.back();
  }

  async uploadPhoto(e: any, field: string) {
    this.loader.present();
    const file = e.target.files[0];
    const url = await this.fileuploadService.uploadFile(
      file,
      Config.storage.shipment,
      `${this.id}_${field}.${file.name.split('.').pop()}`
    );
    this.postDeliveryForm.patchValue({
      [field]: url
    });
    this.loader.dismiss();
  }

  removeInv() {
  }

  removeMLR() {
  }

  get totalExpense() {
    const data = this.shipmentDetails?.voucherData;
    if (!data) {
      return 0;
    }
    return parseFloat(data.dieselExpenseAmount || 0) + parseFloat(data.labourExpenseAmount || 0) + parseFloat(data.khurakiExpenseAmount || 0) + parseFloat(data.freightExpenseAmount || 0) + parseFloat(data.tollExpenseAmount || 0) + parseFloat(data.repairExpenseAmount || 0) + parseFloat(data.otherExpenseAmount || 0);
  }

  async getShipmentDetails() {
    this.loader.present();
    await (await this.shipmentService.getShipmentsById(this.id)).docs.map(async (shipment: any) => {
      const shipmentData = { ...shipment.data(), id: shipment.id, vendor: [] };
      this.shipmentDetails = await this.shipmentDetailService.formatShipment(shipmentData);
      if (this.shipmentDetails.postDeliveryData) {
        this.postDeliveryForm.patchValue(this.shipmentDetails.postDeliveryData);
      } else {
        this.postDeliveryForm.patchValue({
          id: this.id,
          createdAt: new Date(),
          createdById: this.utilService.getUserId(),
          createdByName: this.utilService.getUserName(),
        });
      }
    })
    this.loader.dismiss();
  }

  async addPostDelivery(stat: string) {
    if (!this.postDeliveryForm.valid) {
      this.postDeliveryForm.markAllAsTouched();
      this.notification.showError(this.config.messages.fillAllFields);
      return;
    }
    this.loader.present();
    const formData: any = { postDeliveryData: this.postDeliveryForm.value };
    if (stat === 'Submit') {
      formData['status'] = ShipmentStatus.Completed;
    }
    await this.shipmentService.updShipmentVoucher(this.id, formData);
    if (stat === 'Submit') {
      this.isCompleted = true;
    } else {
      this.notification.showSuccess(this.config.messages.savedSuccessfully);
    }
    this.loader.dismiss();
  }

  dismissModal = async () => {
    this.isCompleted = false;
    return true;
  }
}
