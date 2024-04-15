import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuppliersService } from '../suppliers.service';
import { LoadingController, NavController } from '@ionic/angular';
import { NotificationService } from 'src/app/utils/notification';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-add-suppliers',
  templateUrl: './add-suppliers.page.html',
  styleUrls: ['./add-suppliers.page.scss'],
})
export class AddSuppliersPage implements OnInit {
  private file: any;
  public config = Config; // fetching constant from app config file
  private loader: any;
  public vendorData: any; // Store data of Vendor to edit

  constructor(
    private supplierService: SuppliersService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private notificationService: NotificationService
  ) {}

  supplierForm: FormGroup = new FormGroup({
    supplierName: new FormControl('', [Validators.required]),
    supplierID: new FormControl('', [Validators.required]),
    panNo: new FormControl('', [Validators.required]),
    phoneNO: new FormControl('', [Validators.required]),
    GSTNo: new FormControl('', [Validators.required]),
    googleLoc: new FormControl(''),
    supplierProfileImg: new FormControl(),
    active: new FormControl(true, []),
    pending: new FormControl(false, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
  });

  vendorPicSrc: any = Config.url.defaultProfile;

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    if (history.state.supplier) {
      this.vendorData = JSON.parse(history.state.supplier);
      this.vendorData && this.supplierForm.patchValue(this.vendorData);
      this.vendorPicSrc =
        this.supplierForm.controls['supplierProfileImg'].value;
    }
  }

  get f() {
    return this.supplierForm.controls;
  }

  async uploadPic(e: any) {
    this.file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.vendorPicSrc = reader.result;
    };
  }

  removePic(): void {
    this.vendorPicSrc = Config.url.defaultProfile;
  }

  goBack() {
    this.supplierForm.reset();
    this.removePic();
    this.navCtrl.back();
  }

  async onSubmit() {
    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      this.notificationService.showError(Config.messages.fillAllFields);
      return;
    }
    try {
      this.loader.present();
      if (this.file) {
        const url = await this.supplierService.uploadFile(this.file);
        this.supplierForm.patchValue({
          supplierProfileImg: url as string,
        });
      } else
        this.supplierForm.patchValue({ supplierProfileImg: this.vendorPicSrc });

      this.supplierForm.patchValue({
        pending: false as boolean,
      });

      console.log(this.supplierForm.value);
      await this.supplierService.addVendor(this.supplierForm.value);

      this.supplierForm.reset();
      this.removePic();
      if (this.supplierForm.controls['id'].value == '')
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
      this.notificationService.showError('Something Went Wrong');
      return;
    }
  }
}
