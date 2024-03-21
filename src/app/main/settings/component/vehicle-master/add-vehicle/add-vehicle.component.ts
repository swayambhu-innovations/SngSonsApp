import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleMasterService } from '../vehicle-master.service';
import { LoadingController, NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Config } from 'src/app/config';
import { NotificationService } from 'src/app/utils/notification';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit {
  addVehicleForm: FormGroup = new FormGroup({
    registrationNo: new FormControl('', [Validators.required]),
    chassisNo: new FormControl('', [Validators.required]),
    engineNo: new FormControl('', [Validators.required]),
    vehicleCat: new FormControl(null, [Validators.required]),
    mileage: new FormControl(0, [Validators.required]),
    fuelTankCapacity: new FormControl(0, [Validators.required]),
    currFilledFuel: new FormControl(0, [Validators.required]),
    KOTCapacity: new FormControl(0, [Validators.required]),
    weightCapacity: new FormControl(0, [Validators.required]),
    fuelType: new FormControl(null, [Validators.required]),
    ownershipType: new FormControl(null, [Validators.required]),
    currOdometerReading: new FormControl(0, [Validators.required]),
    fuelVoucherLmt: new FormControl(0, [Validators.required]),
    khurakiExpenseLmt: new FormControl(0, [Validators.required]),
    tollExpenseLmt: new FormControl(0, [Validators.required]),
    repairExpenseLmt: new FormControl(0, [Validators.required]),
    RCNo: new FormControl('', [Validators.required]),
    RCValidity: new FormControl('', [Validators.required]),
    insuranceValidity: new FormControl('', [Validators.required]),
    roadTaxValidity: new FormControl('', [Validators.required]),
    permitValidity: new FormControl('', [Validators.required]),
    pollutionValidity: new FormControl('', [Validators.required]),
    RCPhoto: new FormControl(''),
    insurancePhoto: new FormControl(''),
    permitPhoto: new FormControl(''),
    pollutionPhoto: new FormControl(''),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
  });

  constructor(
    private vehicleMasterService: VehicleMasterService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private notificationService: NotificationService
  ) {}

  public RCPicSrc: any = Config.url.defaultProfile;
  public insurancePicSrc: any = Config.url.defaultProfile;
  public permitPicSrc: any = Config.url.defaultProfile;
  public pollutionPicSrc: any = Config.url.defaultProfile;
  public vehicleCategory: any; // store category of vehicle if already filled
  public categories: any; // store all categories of vehicles
  public vehicleData: any; // store vehicle details for editing
  public categoryID: any; // store category selected
  private loader: any;
  public config = Config; // fetching constant from app config file
  pending: string = 'pending';
  private files: any = {
    RCPhoto: null,
    insurancePhoto: null,
    permitPhoto: null,
    pollutionPhoto: null,
  }; // to store documents files uploaded as proof

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });

    if (history.state.vehicle) {
      this.vehicleData = JSON.parse(history.state.vehicle);
      this.vehicleData && this.addVehicleForm.patchValue(this.vehicleData);
      this.RCPicSrc = this.addVehicleForm.controls['RCPhoto'].value;
      this.insurancePicSrc =
        this.addVehicleForm.controls['insurancePhoto'].value;
      this.permitPicSrc = this.addVehicleForm.controls['permitPhoto'].value;
      this.pollutionPicSrc =
        this.addVehicleForm.controls['pollutionPhoto'].value;
    }

    if (history.state.vehicleCategry) {
      this.vehicleCategory = JSON.parse(history.state.vehicleCategry);
    }

    if (history.state.vehicleCategories) {
      this.categories = JSON.parse(history.state.vehicleCategories);
    }

    if (this.vehicleCategory)
      this.addVehicleForm.patchValue({
        vehicleCat: this.vehicleCategory.id,
      });
  }

  dispDate(e: any, label: string) {
    const date: any = new DatePipe('en-US').transform(
      e.target.value ? e.target.value : new Date(),
      'dd-MMM-YYYY'
    );
    if (label === 'RC') this.addVehicleForm.patchValue({ RCValidity: date });
    else if (label === 'insurance')
      this.addVehicleForm.patchValue({ insuranceValidity: date });
    else if (label === 'roadTax')
      this.addVehicleForm.patchValue({ roadTaxValidity: date });
    else if (label === 'permit')
      this.addVehicleForm.patchValue({ permitValidity: date });
    else if (label === 'pollution')
      this.addVehicleForm.patchValue({ pollutionValidity: date });
  }

  async uploadPic(e: any, label: string) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (label === 'RC') {
        this.RCPicSrc = reader.result;
        this.files.RCPhoto = file;
      } else if (label === 'insurance') {
        this.insurancePicSrc = reader.result;
        this.files.insurancePhoto = file;
      } else if (label === 'permit') {
        this.permitPicSrc = reader.result;
        this.files.permitPhoto = file;
      } else if (label === 'pollution') {
        this.pollutionPicSrc = reader.result;
        this.files.pollutionPhoto = file;
      }
    };
  }

  removePic(label: string): void {
    if (label === 'RC') this.RCPicSrc = Config.url.defaultProfile;
    else if (label === 'insurance')
      this.insurancePicSrc = Config.url.defaultProfile;
    else if (label === 'permit') this.permitPicSrc = Config.url.defaultProfile;
    else if (label === 'pollution')
      this.pollutionPicSrc = Config.url.defaultProfile;
  }

  async submitForm() {
    if (!this.addVehicleForm.valid) {
      this.addVehicleForm.markAllAsTouched();
      this.notificationService.showError(Config.messages.fillAllFields);
      return;
    }
    try {
      this.loader.present();
      for (let key in this.files) {
        if (this.files[key]) {
          const url = await this.vehicleMasterService.uploadFile(
            this.files[key],
            this.addVehicleForm.controls['registrationNo'].value
          );
          this.addVehicleForm.patchValue({
            [key]: url as string,
          });
        } else
          this.addVehicleForm.patchValue({
            [key]:
              this.addVehicleForm.controls[key].value != ''
                ? this.addVehicleForm.controls[key].value
                : Config.url.defaultProfile,
          });
      }
      this.categoryID = this.addVehicleForm.controls['vehicleCat'].value;
      this.categories.map((category: any) => {
        if (category.id == this.categoryID)
          this.addVehicleForm.patchValue({
            vehicleCat: category.categoryName,
          });
      });

      await this.vehicleMasterService.addVehicleCategoryData(
        this.addVehicleForm.value,
        this.categoryID
      );

      await this.vehicleMasterService.deleteVehicle(
        this.pending,
        this.addVehicleForm.controls['registrationNo'].value
      );

      if (this.addVehicleForm.controls['id'].value == '')
        this.notificationService.showSuccess(
          this.config.messages.addedSuccessfully
        );
      else
        this.notificationService.showSuccess(
          this.config.messages.updatedSuccessfully
        );

      this.loader.dismiss();
      this.goBack();
    } catch (error) {
      console.log(error);
      this.notificationService.showError('Something Went Wrong');
      this.loader.dismiss();
      this.goBack();
      return;
    }
  }

  goBack() {
    this.addVehicleForm.reset();
    if (this.vehicleCategory)
      this.navCtrl.navigateBack('/main/settings/vehicle-master');
    else this.navCtrl.back();
  }
}
