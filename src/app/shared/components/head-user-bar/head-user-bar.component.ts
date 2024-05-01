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
import { Config } from 'src/app/config';
import { TodayAttendanceService } from 'src/app/main/today-attendance/today-attendance.service';
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
    private util: UtilService,
    private TodayAttendanceService:TodayAttendanceService
  ) {
    this.sharedService.refresh.subscribe((data) => {
      if (data) {
        this.getUserName();
      }
    });
  }

  notificationCount: number = 8;

  expertSetting = {
    shipment_DayWise: true,
    shipment_Shipment: true,
    shipment_Expense: true,
    shipment_TodayAvg: true,
    attendanceSummaryCard: true,
    attendanceList: true,
    vendor_DayWise: true,
    vendor_VendorWise: true,
    vendor_VehicleType: true,
    vendor_PartyWiseE: true,
    vendor_KOT: true,
  };
  @Input() isHome: boolean = false;
  openMode: boolean = false;
  userName: string = '';
  userAvatar: string = '';
  tabStatus: any = 'simple';
  private loader: any;
  userId = this.util.getUserId();
  modeFormSettings = this.fb.group({
    shipment_DayWise: [true, []],
    shipment_Shipment: [true, []],
    shipment_Expense: [false, []],
    shipment_TodayAvg: [false, []],

    attendanceSummaryCard: [true, []],
    attendanceList: [true, []],


    vendor_DayWise: [true, []],
    vendor_VendorWise: [true, []],
    vendor_VehicleType: [false, []],
    vendor_PartyWiseE: [false, []],
    
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
    // this.TodayAttendanceService.getAttendanceStatus()

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
        console.log(this.homeService.dashBoardSettingFormData)
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
    this.userAvatar = data?.access?.photoURL || '';
        console.log(data?.access)

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
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
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
