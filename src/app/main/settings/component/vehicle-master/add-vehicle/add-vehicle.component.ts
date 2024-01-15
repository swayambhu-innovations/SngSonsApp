import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleMasterService } from '../vehicle-master.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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
    wieghtCapacity: new FormControl(0, [Validators.required]),
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
    RCPhoto: new FormControl('', [Validators.required]),
    insurancePhoto: new FormControl('', [Validators.required]),
    permitPhoto: new FormControl('', [Validators.required]),
    pollutionPhoto: new FormControl('', [Validators.required]),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
  });

  constructor(
    private vehicleMasterService: VehicleMasterService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  public RCPicSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697';
  public insurancePicSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697';
  public permitPicSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697';
  public pollutionPicSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697';
  public formInitalValue = this.addVehicleForm.value;
  public vehicleCategoryId: string = '';

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.vehicleCategoryId = params['id'];
    });
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

  async submitForm() {
    if (this.addVehicleForm.invalid) {
      this.addVehicleForm.markAllAsTouched();
      return;
    }
    const formData = this.addVehicleForm.value;
    await this.vehicleMasterService.addVehicleCategoryData(
      formData,
      this.vehicleCategoryId
    );
  }

  async uploadPic(e: any, label: string) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (label === 'RC') this.RCPicSrc = reader.result;
      else if (label === 'insurance') this.insurancePicSrc = reader.result;
      else if (label === 'permit') this.permitPicSrc = reader.result;
      else if (label === 'pollution') this.pollutionPicSrc = reader.result;
    };
  }

  removePic(label: string): void {
    if (label === 'RC')
      this.RCPicSrc =
        'https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697';
    else if (label === 'insurance')
      this.insurancePicSrc =
        'https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697';
    else if (label === 'permit')
      this.permitPicSrc =
        'https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697';
    else if (label === 'pollution')
      this.pollutionPicSrc =
        'https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697';
  }

  goBack() {
    this.addVehicleForm.reset(this.formInitalValue);
    this.navCtrl.back();
  }
}
