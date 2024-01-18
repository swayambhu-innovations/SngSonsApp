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
  public vehicleCatID: any; // store id of category of vehicle
  public vehicleID: any; // store id of vehicle
  public vehicleCatData: any; // store id of category of vehicle
  public vehicleData: any; // store details of vehicle
  public categories: any; // store all available categories
  private loader: any;
  public showConfirm: boolean = false;

  constructor(
    private vehicleMasterService: VehicleMasterService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.vehicleCatID = this.route.snapshot.paramMap.get('catID');
    this.vehicleID = this.route.snapshot.paramMap.get('id');

    this.init();
  }

  async init() {
    this.loader?.present();
    await this.getCategoryDetails();
    await this.getVehicleDetails();
    this.loader?.dismiss();
  }

  async getCategoryDetails() {
    const category = await this.vehicleMasterService.getCatDetails(
      this.vehicleCatID
    );
    this.vehicleCatData = category?.data();
  }

  async getVehicleDetails() {
    const vehicleDetails = await this.vehicleMasterService.getVehicleDetails(
      this.vehicleCatID,
      this.vehicleID
    );
    this.vehicleData = vehicleDetails?.data();
  }

  async updVendorStatus($event: any, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.vehicleMasterService.updVehicleStatus(
      this.vehicleCatID,
      this.vehicleID,
      status
    );
    this.loader.dismiss();
  }

  async editDetails(event: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward('/main/settings/vehicle-master/add-vehicle', {
      // state: {
      //   vehicle: JSON.stringify(this.vehicleData),
      //   vehicleCategry: JSON.stringify(this.vehicleCat),
      //   vehicleCategories: JSON.stringify(this.categories),
      // },
    });
  }

  async deleteVehicle(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.vehicleMasterService.deleteVehicle(
        this.vehicleCatID,
        this.vehicleID
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
