import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { VehicleMasterService } from './vehicle-master.service';
import { NotificationService } from 'src/app/utils/notification';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.scss'],
})
export class VehicleMasterComponent implements OnInit {
  public vehicleCatID: any; // store id of category of vehicle
  public vehicleCatData: any; // store details of category
  public vehiclesData: any; // store details of vehicle
  public categories: any; // store all available categories
  public filteredVehiclesData: any;
  public loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;

  constructor(
    private vehicleMasterService: VehicleMasterService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private sharedService: SharedService,
    private route: ActivatedRoute
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
    this.vehicleCatID = this.route.snapshot.paramMap.get('catID');

    this.init();
  }

  openAddVehicleForm() {
    this.navCtrl.navigateForward([
      '/main/settings/vehicle-master/' + this.vehicleCatID + '/add-vehicle/123',
    ]);
  }

  openVehiclesDetails(vehicle: any) {
    this.navCtrl.navigateForward([
      '/main/settings/vehicle-master/' +
        this.vehicleCatID +
        '/vehicle-details/' +
        vehicle.id,
    ]);
  }

  async getCategoryDetails() {
    const category = await this.vehicleMasterService.getCatDetails(
      this.vehicleCatID
    );
    this.vehicleCatData = category?.data();
  }

  async getVehicles() {
    const data = await this.vehicleMasterService.getVehicles(this.vehicleCatID);
    if (data?.docs[0])
      this.vehiclesData = data?.docs.map((vehicle: any) => {
        return { ...vehicle.data(), id: vehicle.id };
      });
    this.filteredVehiclesData = this.vehiclesData;
  }

  async ionViewDidEnter() {
    this.init();
  }

  async init() {
    this.loader?.present();
    await this.getCategoryDetails();
    await this.getVehicles();
    this.loader?.dismiss();
  }

  searchVehicle(e: any) {
    const searchValue = e.detail.value;
    if (searchValue && searchValue.trim() !== '') {
      this.filteredVehiclesData = this.vehiclesData.filter((vehicle: any) =>
        vehicle.registrationNo.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else this.filteredVehiclesData = this.vehiclesData;
  }

  async updVehicleStatus($event: any, vehicleId: string, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.vehicleMasterService.updVehicleStatus(
      this.vehicleCatID,
      vehicleId,
      status
    );
    await this.getVehicles();
    this.loader.dismiss();
  }

  async editDetails(event: any, vehicle: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward([
      '/main/settings/vehicle-master/' +
        this.vehicleCatID +
        '/add-vehicle/' +
        vehicle.id,
    ]);
  }

  async deleteVehicle(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.vehicleMasterService.deleteVehicle(
        this.vehicleCatID,
        this.toDelete.id
      );
      await this.getVehicles();
      this.loader.dismiss();
      this.notificationService.showSuccess(Config.messages.deletedSuccessfully);
    }
    this.showConfirm = false;
  }
}
