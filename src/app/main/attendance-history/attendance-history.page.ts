import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { Location } from "@angular/common";
// import { EditInfoPermissionService } from "../edit-info/edit-info.service";
import { UtilService } from "src/app/utils/util";

@Component({
  selector: "app-attendance-history",
  templateUrl: "./attendance-history.page.html",
  styleUrls: ["./attendance-history.page.scss"],
})
export class AttendanceHistoryPage implements OnInit {
  constructor(
    private location: Location,
    // private editInfoPermissionService: EditInfoPermissionService,
    private utilService: UtilService
  ) {}
  userData: any;
  empData: any;
  loader: any;
  allEmpsData: any[] = [];

  async ngOnInit() {
    if (history.state.empData) {
      this.empData = JSON.parse(history.state.empData);
    }

    const data: any = this.utilService.getUserdata();
    this.userData = data?.access;
    // this.getAllEmps();
  }

  // async getAllEmps() {
  //   const data = await this.editInfoPermissionService.getUsers();
  //   data.docs.map((employee) => {
  //     this.allEmpsData.push({ ...employee.data(), id: employee.id });
  //   });
  // }

  startDate: Date = moment(new Date()).startOf("month").toDate();
  lastDate: Date = moment(new Date()).startOf("month").toDate();

  updateStartDate(e: any) {
    this.startDate = moment(e.target.value).toDate();
  }
  updateLastDate(e: any) {
    this.lastDate = moment(e.target.value).toDate();
  }

  formatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }

  entries = [
    {
      "Sl. No.": 1,
      Date: "13 Jan 2024",
      Status: true,
    },
    {
      "Sl. No.": 2,
      Date: "13 Jan 2024",
      Status: false,
    },
    {
      "Sl. No.": 3,
      Date: "13 Jan 2024",
      Status: true,
    },
    {
      "Sl. No.": 4,
      Date: "13 Jan 2024",
      Status: false,
    },
    {
      "Sl. No.": 5,
      Date: "13 Jan 2024",
      Status: true,
    },
  ];

  getStatusColor(status: boolean): string {
    return status ? "#29D25F" : "#EA712E";
  }

  goback() {
    // this.navCtrl.navigateBack(this.backURL);
    this.location.back();
  }
}
