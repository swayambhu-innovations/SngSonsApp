import { Component, OnInit, ViewChild } from '@angular/core';
import {
  LoadingController,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';
import { Config } from 'src/app/config';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { NotificationService } from 'src/app/utils/notification';
import { Position } from '@capacitor/geolocation';
import { OperationService } from './operation.service';

@Component({
  selector: 'app-operation-setting',
  templateUrl: './operation-setting.page.html',
  styleUrls: ['./operation-setting.page.scss'],
})
export class OperationSettingPage implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private navCtrl: NavController,
    private operationService: OperationService,
    private loadingController: LoadingController
  ) {}

  isMapForm: boolean = false; // checking if ion-modal is open/close
  private loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;
  allAreas: any[] = []; // store all registerd areas fetched from DB
  allEmpsData: any[] = []; // store all registerd users fetched from DB

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });

    this.loader.present();
    this.getAllAreas();
    // this.getAllEmps();

    this.loader.dismiss();
  }

  // async getAllEmps() {
  //   const data = await this.editInfoPermissionService.getUsers();
  //   data.docs.map((employee) => {
  //     this.allEmpsData.push({ ...employee.data(), id: employee.id });
  //   });
  // }

  async getAllAreas() {
    this.allAreas = [];
    await this.operationService.getAreas().then((data) =>
      data.docs.map((area) => {
        this.allAreas.push({ ...area.data(), id: area.id });
      })
    );
  }

  async updateEmpArea(areaID: any, emp: any) {
    this.loader.present();
    const data = {
      ...emp,
      areaID: areaID,
    };
    await this.operationService.addAreas(data);
    this.loader.dismiss();
    this.getAllAreas();
  }

  async delArea(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.operationService.deleteArea(this.toDelete.id);
      this.getAllAreas();
      this.loader.dismiss();
      this.notificationService.showSuccess(Config.messages.deletedSuccessfully);
    }
    this.showConfirm = false;
  }

  async updAreaStatus(event: any, areaID: any, status: boolean) {
    event.stopPropagation();
    this.loader.present();
    await this.operationService.updAreaStatus(areaID, status);
    this.getAllAreas();
    this.loader.dismiss();
  }

  async addLocation() {
    this.navCtrl.navigateForward(
      '/main/settings/operation-setting/add-location'
    );
  }

  async editDetails(event: any, area: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward(
      ['/main/settings/operation-setting/add-location'],
      {
        state: {
          area: JSON.stringify(area),
        },
      }
    );
  }
}
