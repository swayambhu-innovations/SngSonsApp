import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { UtilService } from 'src/app/utils/util';
import { HeadUserBarService } from './head-user-bar.service';
import { HomeService } from 'src/app/main/home/home.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-head-user-bar',
  templateUrl: './head-user-bar.component.html',
  styleUrls: ['./head-user-bar.component.scss'],
})
export class HeadUserBarComponent implements OnInit {
  constructor(
    private navCtrl: NavController,
    private utilService: UtilService,
    private headBarService: HeadUserBarService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private loadingController: LoadingController,
    private homeService: HomeService,
    private util: UtilService
  ) {}

  notificationCount: number = 8;

  expertSetting = {
    shipment_DayWise: true,
    shipment_Shipment: true,
    shipment_Expense: true,
    shipment_TodayAvg: true,
    vehicle_DayWise: true,
    vehicle_VehicleNo: true,
    vehicle_VehicleType: true,
    vehicle_VehicleWise: true,
    vehicle_PartyWise: true,
    vehicle_DieselV: true,
    vehicle_AttachedO: true,
    vendor_DayWise: true,
    vendor_VendorWise: true,
    vendor_VehicleType: true,
    vendor_PartyWiseE: true,
    vendor_PartyWiseS: true,
    vendor_KOT: true,
  };
  @Input() isHome: boolean = false;
  openMode: boolean = false;
  userName: string = '';
  tabStatus: any = 'simple';
  private loader: any;
  userId = this.util.getUserId();
  modeFormSettings = this.fb.group({
    shipment_DayWise: [true, []],
    shipment_Shipment: [true, []],
    shipment_Expense: [false, []],
    shipment_TodayAvg: [false, []],
    vehicle_DayWise: [true, []],
    vehicle_VehicleNo: [true, []],
    vehicle_VehicleType: [false, []],
    vehicle_VehicleWise: [false, []],
    vehicle_PartyWise: [false, []],
    vehicle_DieselV: [false, []],
    vehicle_AttachedO: [false, []],
    vendor_DayWise: [true, []],
    vendor_VendorWise: [true, []],
    vendor_VehicleType: [false, []],
    vendor_PartyWiseE: [false, []],
    vendor_PartyWiseS: [false, []],
    vendor_KOT: [false, []],
    tab: [this.tabStatus],
  });

  public initalFormValue: object = { ...this.modeFormSettings.value };

  async ngOnInit() {
    // this.loader = await this.loadingController.create({
    //   message: 'please wait',
    // });
    this.getUserName();
    this.homeService.dashBoardSettingFormData =
      (await this.headBarService.getDashBoardSetting(this.userId)).data() || {};
    if (Object.keys(this.homeService.dashBoardSettingFormData).length) {
      this.modeFormSettings.patchValue(
        this.homeService.dashBoardSettingFormData
      );
      this.tabStatus = this.modeFormSettings.get('tab')?.value;
    } else {
      this.homeService.dashBoardSettingFormData = this.expertSetting;
    }
  }

  goHome() {
    this.navCtrl.navigateForward('main/home');
  }

  refreshAll() {
    this.sharedService.refresh.next(true);
  }

  openNotifications() {
    this.navCtrl.navigateForward('main/notifications');
  }

  changeTab(id: string) {
    this.tabStatus = id;
    this.modeFormSettings.patchValue({ tab: this.tabStatus });
    if (this.tabStatus == 'simple') {
      this.modeFormSettings.patchValue(this.initalFormValue);
      this.modeFormSettings.disable();
    } else if (this.tabStatus == 'expert') {
      this.modeFormSettings.patchValue(this.expertSetting);
      this.modeFormSettings.disable();
    } else {
      if (Object.keys(this.homeService.dashBoardSettingFormData).length) {
        this.modeFormSettings.patchValue(
          this.homeService.dashBoardSettingFormData
        );
      }
      this.modeFormSettings.patchValue({ tab: this.tabStatus });
      this.modeFormSettings.enable();
    }
  }

  dismissModal = async () => {
    this.openMode = false;
    return true;
  };

  getUserName() {
    const data: any = this.utilService.getUserdata();
    this.userName = data?.access?.userName || '';
  }

  getDashboardSettingData() {}

  dashboardEye() {
    this.openMode = true;
    if (this.tabStatus == 'simple') {
      this.modeFormSettings.disable();
    }
  }

  closeModal() {
    this.openMode = false;
  }

  async onSubmit() {
    this.loader.present();
    this.homeService.dashBoardSettingFormData = this.modeFormSettings.value;
    await this.headBarService.setDashBoardSetting(
      this.modeFormSettings.value,
      this.userId
    );
    this.openMode = false;
    this.loader.dismiss();
  }
}
