import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { VehicleMasterService } from './vehicle-master.service';
import { NotificationService } from 'src/app/utils/notification';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.scss'],
})
export class VehicleMasterComponent implements OnInit {
  public vehicleCat: any;
  public vehiclesData: any;
  public loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;

  constructor(
    private vehicleMasterService: VehicleMasterService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private sharedService: SharedService
  ) {
    this.sharedService.refresh.subscribe((data) => {
      if (data) {
        this.init();
      }
    });
  }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    if (history.state.vehicleCat) {
      this.vehicleCat = JSON.parse(history.state.vehicleCat);
    }
    this.init();
  }

  openAddVehicleForm() {
    this.navCtrl.navigateForward(
      '/main/settings/vehicle-master/add-vehicle/' + this.vehicleCat?.id
    );
    this.init();
  }

  async getVehicles() {
    this.loader?.present();
    const data = await this.vehicleMasterService.getVehicles(
      this.vehicleCat?.id
    );
    this.vehiclesData = data.docs.map((vehicle) => {
      return { ...vehicle.data(), id: vehicle.id };
    });
    this.loader.dismiss();
  }

  async init() {
    this.loader?.present();
    await this.getVehicles();
    this.loader.dismiss();
  }

  async updVehicleStatus($event: any, vehicleId: string, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.vehicleMasterService.updVehicleStatus(
      this.vehicleCat?.id,
      vehicleId,
      status
    );
    await this.getVehicles();
    this.loader.dismiss();
  }

  async editDetails(event: any, vehicle: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward(
      ['/main/settings/vehicle-master/add-vehicle/' + this.vehicleCat?.id],
      {
        state: { vendor: JSON.stringify(vehicle) },
      }
    );
  }

  async deleteVehicle(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.vehicleMasterService.deleteVehicle(
        this.vehicleCat?.id,
        this.toDelete.id
      );
      await this.getVehicles();
      this.loader.dismiss();
      this.notificationService.showSuccess(Config.messages.deletedSuccessfully);
    }
    this.showConfirm = false;
  }
}
