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
import { UserPermissionService } from '../user-permission/user-permission.service';

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
    private userPermissionService: UserPermissionService,
    private loadingController: LoadingController
  ) {}

  isMapForm: boolean = false; // checking if ion-modal is open/close
  private loader: any;
  private loader1: any;
  public toDelete: any;
  public showConfirm: boolean = false;
  selectedArea: any;
  allAreas: any[] = []; // store all registerd areas fetched from DB
  allEmpsData: any[] = []; // store all registerd users fetched from DB

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });

    this.loader.present();
    this.getAllAreas();
    this.getAllEmps();
    this.loader.dismiss();
  }

  async getAllEmps() {
    this.allEmpsData = [];
    this.loader.present();
    const data = await this.userPermissionService.getUsers();
    this.allEmpsData = data.docs.map((user) => {
      return { ...user.data(), id: user.id };
    });
    this.loader.dismiss();
  }

  async getAllAreas() {
    this.allAreas = [];
    this.loader?.present();
    await this.operationService.getAreas().then((data) =>
      data.docs.map((area) => {
        this.allAreas.push({ ...area.data(), id: area.id });
      })
    );
    this.loader.dismiss();
  }

  async updateEmpArea(areaID: any, empID: any) {
    this.loader1 = await this.loadingController.create({
      message: 'Updating Area',
    });
    this.loader1.present();
    await this.operationService.updateArea(areaID, empID);
    this.getAllAreas();
    this.getAllEmps();
    this.loader1.dismiss();
  }

  async delArea(confirmation: any) {
    this.loader.present();
    this.allEmpsData.map((item) => {
      if (item.areaID == this.toDelete.id) {
        this.notificationService.showError("Location can't be Deleted");
        confirmation = false;
      }
    });

    if (confirmation) {
      await this.operationService.deleteArea(this.toDelete.id);
      this.getAllAreas();
      this.notificationService.showSuccess(Config.messages.deletedSuccessfully);
    }
    this.showConfirm = false;
    this.loader.dismiss();
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
