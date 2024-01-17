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
  public vehicleCat: any; // store category of vehicle
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
    if (history.state.vehicleCategories) {
      this.categories = JSON.parse(history.state.vehicleCategories);
    }
    this.init();
  }

  openAddVehicleForm() {
    this.navCtrl.navigateForward('/main/settings/vehicle-master/add-vehicle', {
      state: {
        vehicleCategry: JSON.stringify(this.vehicleCat),
        vehicleCategories: JSON.stringify(this.categories),
      },
    });
    this.init();
  }

  openVehiclesDetails(vehicle: any) {
    this.navCtrl.navigateForward(
      '/main/settings/vehicle-master/vehicle-details',
      {
        state: {
          vehicle: JSON.stringify(vehicle),
          vehicleCategry: JSON.stringify(this.vehicleCat),
          vehicleCategories: JSON.stringify(this.categories),
        },
      }
    );
    this.init();
  }

  async getVehicles() {
    const data = await this.vehicleMasterService.getVehicles(
      this.vehicleCat?.id
    );
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
      this.vehicleCat?.id,
      vehicleId,
      status
    );
    await this.getVehicles();
    this.loader.dismiss();
  }

  async editDetails(event: any, vehicle: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward('/main/settings/vehicle-master/add-vehicle', {
      state: {
        vehicle: JSON.stringify(vehicle),
        vehicleCategry: JSON.stringify(this.vehicleCat),
        vehicleCategories: JSON.stringify(this.categories),
      },
    });
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
