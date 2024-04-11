import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from "@ionic/angular";
import { Config } from "src/app/config";
import { UtilService } from "src/app/utils/util";
import { HistoryemployeeService } from "./historyemployee.service"

@Component({
  selector: 'app-historyemployee',
  templateUrl: './historyemployee.page.html',
  styleUrls: ['./historyemployee.page.scss'],
})
export class HistoryemployeePage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private utilService: UtilService,
    private loadingController: LoadingController,
    private HistoryemployeeService:HistoryemployeeService

  ) {}


  userData: any;
  loader: any;
  allEmpsData: any[] = [];

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    const data: any = this.utilService.getUserdata();
    this.userData = data?.access;
    this.getAllEmps();
  }

  async getAllEmps() {
    const data = await this.HistoryemployeeService.getUsers();
    data.docs.map((employee) => {
      this.allEmpsData.push({ ...employee.data(), id: employee.id });
    });
  }

  navigatetohistory(emp: any) {
    this.navCtrl.navigateForward(["/main/attendance-history"], {
      state: { empData: JSON.stringify(emp) },
    });
  }
}
