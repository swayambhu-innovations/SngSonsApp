import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/config';
import { LoadingController, NavController } from '@ionic/angular';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  // tableData = [
  //   { name: 'Vehicle No.', key: 'LorryNo', size: '4' },
  //   { name: 'Party Name', key: 'CustomerName', size: '3' },
  //   { name: 'Area', key: 'WSTown', size: '3' }
  // ];
  constructor(
    public vehicleService: VehicleService,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {}
  message: string;

  loader: any;
  showLogout: boolean = false;
  userData: any;
  allEmpsData: any[] = [];
  filteredEmps: any[] = [];
  allAttendance: any[] = [];
  orgProfile: any;
  isOrganizationSetting: boolean = false;
  viewNo: number = 6;

  summary: any;

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });

    this.getAllEmps();
  }

  async getAttendanceOnDate(date: string) {
    this.allAttendance = [];
    let totalAbsent = 0;
    let totalPresent = 0;
    let totalPending = this.allEmpsData.length;
    const currDate = new Date(date);
    const day = currDate.getDate();
    await this.vehicleService.getAttendanceOnDate(date).then((data) => {
      data.docs.map((attendance) => {
        const temp = attendance.data()[day];
        if (temp?.present !== undefined) {
          this.allAttendance.push({ id: attendance.id, present: temp.present });
          for (let emp of this.allEmpsData) {
            if (emp.id == attendance.id) {
              if (temp.present) {
                totalPresent++;
              } else {
                totalAbsent++;
              }
            }
          }
        }
      });
    });
    totalPending = totalPending - (totalPresent + totalAbsent);
    this.summary = {
      present: totalPresent,
      absent: totalAbsent,
      pending: totalPending,
      total: this.allEmpsData.length
    };
  }

  async getAllAttendance() {

    let totalAbsent = 0;
    let totalPresent = 0;
    let totalPending = this.allEmpsData.length;

    this.allAttendance = [];
    const currentDate = new Date();
    const todayDate = currentDate.getDate().toString();
    await this.vehicleService.getAttendance().then((data) => {
      data.docs.map((attendance) => {
        const temp = attendance.data()[todayDate];
        if (temp?.present !== undefined) {
          this.allAttendance.push({ id: attendance.id, present: temp.present });
          if (temp?.present !== undefined) {
            this.allAttendance.push({ id: attendance.id, present: temp.present });
            for (let emp of this.allEmpsData) {
              if (emp.id == attendance.id) {
                if (temp.present) {
                  totalPresent++;
                } else {
                  totalAbsent++;
                }
              }
            }
          }
        }
      });
    });
    totalPending = totalPending - (totalPresent + totalAbsent);
    this.summary = {
      present: totalPresent,
      absent: totalAbsent,
      pending: totalPending,
      total: this.allEmpsData.length
    };
    console.log(this.summary)
  }

  async getOrganizations() {
    await this.vehicleService
      .getOrganizationDetail(this.userData?.orgID)
      .then((data) => {
        this.orgProfile = data;
      });
  }

  // handleRefresh(event: any) {
  //   setTimeout(() => {
  //     this.loader.present();
  //     const data: any = this.utilService.getUserdata();
  //     this.userData = data?.access;
  //     if (this.userData?.imageUrl != "")
  //       this.dummyProfile = this.userData?.imageUrl;
  //     this.allEmpsData = []; //new
  //     // this.getAllEmps(); //this is causing duplication of data
  //     this.getOrganizations();
  //     this.loader.dismiss();
  //     event.target.complete();
  //   }, 1000);
  // }
  //  refresh() {
  //     this.loader.present();
  //     const data: any = this.utilService.getUserdata();
  //     this.userData = data?.access;
  //     if (this.userData?.imageUrl != "")
  //       this.dummyProfile = this.userData?.imageUrl;
  //     this.allEmpsData = []; //new
  //     this.getAllEmps();
  //     this.getOrganizations();
  //     this.loader.dismiss();
  //   }

  getPresentDetail(employee: any): any {
    for (let i = 0; i < this.allAttendance.length; i++) {
      if (
        this.allAttendance[i].id == employee &&
        this.allAttendance[i].present == true
      ) {
        return '#29D25F';
      } else if (
        this.allAttendance[i].id == employee &&
        this.allAttendance[i].present == false
      ) {
        return '#EA712E';
      }
    }
    return '#9FA7B2';
  }
  getPresentStatus(employee: any): any {
    for (let i = 0; i < this.allAttendance.length; i++) {
      if (
        this.allAttendance[i].id == employee &&
        this.allAttendance[i].present == true
      ) {
        return 'PRESENT';
      } else if (
        this.allAttendance[i].id == employee &&
        this.allAttendance[i].present == false
      ) {
        return 'ABSENT';
      }
    }
    return 'PENDING';
  }

  async getAllEmps() {
    const data = await this.vehicleService.getUsers();
    data.docs.map((employee) => {
      this.allEmpsData.push({ ...employee.data(), id: employee.id });
    });
    this.getAllAttendance()

    this.filteredEmps = this.allEmpsData;
  }

  navigateToHistoryEmployee() {
    this.navCtrl.navigateForward('/main/historyemployee');
  }

  navigateToMarkAttendance() {
    this.navCtrl.navigateForward('/main/today-attendance');
  }

  searchEmps(e: any) {
    const searchValue = e.detail.value;
    if (searchValue && searchValue.trim() !== '') {
      this.filteredEmps = this.allEmpsData.filter((emps: any) =>
        emps.userName?.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else this.filteredEmps = this.allEmpsData;
  }

  // async autoRefresh(){
  //   this.loader.present();
  //   const data: any = this.utilService.getUserdata();
  //   this.userData = data?.access;
  //   if (this.userData?.imageUrl != "")
  //     this.dummyProfile = this.userData?.imageUrl;
  //   this.allEmpsData = []; //new
  //   // this.getAllEmps(); //removed due to duplication of data
  //   this.getOrganizations();
  //   this.loader.dismiss();

  //   this.allAttendance = [];
  //   const currentDate = new Date();
  //   const todayDate = currentDate.getDate().toString();
  //   await this.vehicleService.getAttendance().then((data) => {
  //     data.docs.map((attendance) => {
  //       const temp = attendance.data()[todayDate];
  //       if (temp?.present !== undefined) {
  //         this.allAttendance.push({ id: attendance.id, present: temp.present });
  //       }
  //     });
  //   });
  // }
}
