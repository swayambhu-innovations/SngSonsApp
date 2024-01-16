import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Config } from 'src/app/config';
import { SharedService } from 'src/app/shared/shared.service';
import { NotificationService } from 'src/app/utils/notification';
import { VehicleCategoryService } from './vehicle-category.service';

@Component({
  selector: 'app-vehicle-category',
  templateUrl: './vehicle-category.component.html',
  styleUrls: ['./vehicle-category.component.scss'],
})
export class VehicleCategoryComponent implements OnInit {
  presentingElement: any = '' || null;
  vehicleCategoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
    weightCapacity: new FormControl(0, [Validators.required]),
    minimumFuel: new FormControl(0, [Validators.required]),
    maximumFuel: new FormControl(0, [Validators.required]),
    minimumToll: new FormControl(0, [Validators.required]),
    maximumToll: new FormControl(0, [Validators.required]),
    defaultKOTCapacity: new FormControl(0, [Validators.required]),
    defaultFuelType: new FormControl('', [Validators.required]),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
    count: new FormControl(0),
  });
  public formInitalValue = this.vehicleCategoryForm.value;
  public loader: any;
  public vehicleCategory: any;
  public filterdVehicleCategory: any;
  public pendingVehicles: any;
  public isModalOpen: boolean = false;
  public showConfirm: boolean = false;
  public deleteId: any;

  constructor(
    private notification: NotificationService,
    private loadingController: LoadingController,
    private sharedService: SharedService,
    private navCtrl: NavController,
    private vehicleCateoryService: VehicleCategoryService,
    private modalCtrl: ModalController
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
    this.init();
    this.presentingElement = document.querySelector('.ion-category-page');
  }

  async init() {
    this.loader?.present();
    await this.getVehicleCategoryData();
    this.loader.dismiss();
  }

  searchVehicleCategory(e: any) {
    const searchValue = e.detail.value;
    if (searchValue && searchValue.trim() !== '') {
      this.filterdVehicleCategory = this.vehicleCategory.filter(
        (vehicleCat: any) =>
          vehicleCat.categoryName
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );
    } else this.filterdVehicleCategory = this.vehicleCategory;
  }

  async submitForm() {
    if (!this.vehicleCategoryForm.valid) {
      this.vehicleCategoryForm.markAllAsTouched();
      return;
    }
    this.loader?.present();
    this.vehicleCategoryForm.patchValue({
      pending: false as boolean,
    });
    const formData = this.vehicleCategoryForm.value;
    await this.vehicleCateoryService.addVehicleCategoryData(formData);
    this.notification.showSuccess(
      !formData
        ? Config.messages.addedSuccessfully
        : Config.messages.updatedSuccessfully
    );
    this.vehicleCategoryForm.reset(this.formInitalValue);
    await this.getVehicleCategoryData();
    this.loader.dismiss();
    this.modalCtrl.dismiss();
    this.isModalOpen = false;
  }

  async getVehicleCategoryData() {
    const data = await this.vehicleCateoryService.getVehicleCategoryData();
    this.vehicleCategory = data.docs.map((category) => {
      return { ...category.data(), id: category.id };
    });
    this.pendingVehicles = this.vehicleCategory.filter(
      (vendor: any) => vendor?.pending == true
    );
    this.vehicleCategory = this.vehicleCategory.filter(
      (vendor: any) => vendor?.pending == false
    );
    this.filterdVehicleCategory = this.vehicleCategory;
  }

  async updVehicleCategoryStatus(
    $event: any,
    cateoryId: string,
    status: boolean
  ) {
    $event.stopPropagation();
    this.loader?.present();
    await this.vehicleCateoryService.updVehicleCategoryStatus(
      cateoryId,
      status
    );
    await this.getVehicleCategoryData();
    this.loader.dismiss();
  }

  async deleteVehicleCat(confirmation: any) {
    if (confirmation) {
      this.loader?.present();
      const isVehicles: boolean =
        await this.vehicleCateoryService.isAnyVehicleColl(this.deleteId);
      if (!isVehicles) {
        await this.vehicleCateoryService.deleteVehicleCategory(this.deleteId);
        await this.getVehicleCategoryData();
        this.notification.showSuccess(Config.messages.deletedSuccessfully);
      } else this.notification.showError(Config.messages.vehiclesPresent);
      this.loader.dismiss();
    }
    this.showConfirm = false;
  }

  openVehicle(id: any, vehicleCatName: any) {
    const vehicleCat = {
      id: id,
      vehicleCatName: vehicleCatName,
    };
    this.navCtrl.navigateForward(['main/settings/vehicle-master'], {
      state: { vehicleCat: JSON.stringify(vehicleCat) },
    });
  }
}
