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
  public vehicleCatID: string = '';
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
    this.route.params.subscribe((params) => {
      this.vehicleCatID = params['id'];
    });
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  async updVendorStatus($event: any, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.vehicleMasterService.updVehicleStatus(
      this.vehicleCatID,
      this.vehicleData.id,
      status
    );
    this.loader.dismiss();
  }

  async editDetails(event: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward(
      ['/main/settings/vehicle-master/add-vehicle/' + this.vehicleCatID],
      {
        state: { vehicle: JSON.stringify(this.vehicleData) },
      }
    );
  }

  async deleteVehicle(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.vehicleMasterService.deleteVehicle(
        this.vehicleCatID,
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
