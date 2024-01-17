import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { NotificationService } from 'src/app/utils/notification';
import { VehicleMasterService } from '../vehicle-master.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss'],
})
export class VehicleDetailsComponent implements OnInit {
  public vehicleData: any;
  public vehicleCat: any;
  private loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;

  constructor(
    private vehicleMasterService: VehicleMasterService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    if (history.state.vehicle)
      this.vehicleData = JSON.parse(history.state.vehicle);
    if (history.state.vehicleCategry)
      this.vehicleCat = JSON.parse(history.state.vehicleCategry);
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  async updVendorStatus($event: any, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.vehicleMasterService.updVehicleStatus(
      this.vehicleCat.id,
      this.vehicleData.id,
      status
    );
    this.loader.dismiss();
  }

  async editDetails(event: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward('/main/settings/vehicle-master/add-vehicle', {
      state: {
        vehicle: JSON.stringify(this.vehicleData),
        vehicleCategry: JSON.stringify(this.vehicleCat),
      },
    });
  }

  async deleteVehicle(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.vehicleMasterService.deleteVehicle(
        this.vehicleCat.id,
        this.toDelete.id
      );
      this.loader.dismiss();
      this.notificationService.showSuccess(Config.messages.deletedSuccessfully);
      this.navCtrl.navigateForward(['main/settings/vehicle-master']);
    }
    this.showConfirm = false;
  }

  goBack() {
    this.navCtrl.back();
  }
}
