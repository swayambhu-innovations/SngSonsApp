import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleMasterService } from '../vehicle-master.service';
import { LoadingController, NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Config } from 'src/app/config';
import { NotificationService } from 'src/app/utils/notification';
import { ActivatedRoute } from '@angular/router';
import { VehicleCategoryService } from '../../vehicle-category/vehicle-category.service';

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
    private vehicleCategoryService: VehicleCategoryService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  public RCPicSrc: any = Config.url.defaultProfile;
  public insurancePicSrc: any = Config.url.defaultProfile;
  public permitPicSrc: any = Config.url.defaultProfile;
  public pollutionPicSrc: any = Config.url.defaultProfile;
  // public vehicleCategory: any; // store category of vehicle if already filled
  public categories: any; // store all categories of vehicles
  public vehicleID: any; // store id of vehicle to be edited
  public vehicleData: any; // store vehicle details for editing
  public vehicleCatID: any; // store category of vehicle to be edited
  private loader: any;
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
    this.vehicleCatID = this.route.snapshot.paramMap.get('catID');
    this.vehicleID = this.route.snapshot.paramMap.get('id');

    this.init();
  }

  async init() {
    this.loader?.present();
    await this.getAllCategories();
    this.vehicleID != '123' && (await this.getVehicleDetails());
    // await this.getCategoryDetails();
    this.loader?.dismiss();
  }

  // async getCategoryDetails() {
  //   const category = await this.vehicleMasterService.getCatDetails(
  //     this.vehicleCatID
  //   );
  //   this.vehicleCategory = category?.data();
  // }

  async getVehicleDetails() {
    const vehicleDetails = await this.vehicleMasterService.getVehicleDetails(
      this.vehicleCatID,
      this.vehicleID
    );
    this.vehicleData = vehicleDetails?.data();
    this.vehicleData && this.addVehicleForm.patchValue(this.vehicleData);
    this.RCPicSrc = this.addVehicleForm.controls['RCPhoto'].value;
    this.insurancePicSrc = this.addVehicleForm.controls['insurancePhoto'].value;
    this.permitPicSrc = this.addVehicleForm.controls['permitPhoto'].value;
    this.pollutionPicSrc = this.addVehicleForm.controls['pollutionPhoto'].value;
  }

  dispDate(e: any, label: string) {
    const date: any = new DatePipe('en-US').transform(
      e.target.value,
      'dd MMM YYYY'
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

  async getAllCategories() {
    const data = await this.vehicleCategoryService.getAllCategories();
    this.categories = data.docs.map((category) => {
      return (
        category.id != 'pending' && { ...category.data(), id: category.id } //excluding pending category
      );
    });
    this.categories = this.categories.filter((vehicleCat: any) => vehicleCat); // validating if vehicle category is present
  }

  async submitForm() {
    if (!this.addVehicleForm.valid) {
      this.addVehicleForm.markAllAsTouched();
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

      if (this.vehicleCatID == 'pending')
        await this.vehicleMasterService.deleteVehicle(
          this.vehicleCatID,
          this.vehicleData.registrationNo
        );
      else if (this.addVehicleForm.controls['id'].value != '')
        await this.vehicleMasterService.deleteVehicle(
          this.vehicleData.vehicleCat,
          this.vehicleData.id
        );

      this.addVehicleForm.patchValue({
        id: this.addVehicleForm.controls['registrationNo'].value.toString(),
      });

      await this.vehicleMasterService.addVehicleCategoryData(
        this.addVehicleForm.value,
        this.addVehicleForm.controls['vehicleCat'].value
      );

      if (this.addVehicleForm.controls['id'].value == '')
        this.notificationService.showSuccess(Config.messages.addedSuccessfully);
      else
        this.notificationService.showSuccess(
          Config.messages.updatedSuccessfully
        );
      this.loader.dismiss();
      this.goBack();
    } catch (error) {
      console.log(error);
      this.notificationService.showError('Something Went Wrong');
      return;
    }
  }

  goBack() {
    this.addVehicleForm.reset();
    this.navCtrl.back();
  }
}
