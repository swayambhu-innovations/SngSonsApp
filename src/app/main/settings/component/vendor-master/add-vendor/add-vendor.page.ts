import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorMasterService } from '../vendor-master.service';
import { LoadingController, NavController } from '@ionic/angular';
import { NotificationService } from 'src/app/utils/notification';
import { SharedService } from 'src/app/shared/shared.service';
import { Config } from 'src/app/config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.page.html',
  styleUrls: ['./add-vendor.page.scss'],
})
export class AddVendorPage implements OnInit {
  private file: any;
  public config = Config; // fetching constant from app config file
  private loader: any;
  public vendorData: any; // Store data of Vendor to edit

  constructor(
    private vendorMasterService: VendorMasterService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  vendorForm: FormGroup = new FormGroup({
    WSName: new FormControl('', [Validators.required]),
    WSCode: new FormControl('', [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
    WSTown: new FormControl('', [Validators.required]),
    panNo: new FormControl('', [Validators.required]),
    phoneNO: new FormControl('', [Validators.required]),
    GSTNo: new FormControl('', [Validators.required]),
    shippingType: new FormControl(null, [Validators.required]),
    distance: new FormControl('', [Validators.required]),
    maxCreditLimit: new FormControl('', [Validators.required]),
    vendorProfileImg: new FormControl(),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
  });

  postalCode: string[] = ['226029', '211001', '110241', '224531'];
  shippingType: string[] = ['Truck', 'Trailor'];

  vendorPicSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.route.queryParams.subscribe((params: any) => {
      this.vendorData = params.vendor;
    });
    this.vendorData && this.vendorForm.setValue(this.vendorData);
  }

  get f() {
    return this.vendorForm.controls;
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
    this.vendorPicSrc =
      'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';
  }

  goBack() {
    this.vendorForm.reset();
    this.removePic();
    this.navCtrl.back();
  }

  async onSubmit() {
    if (this.vendorForm.invalid) return;

    try {
      this.loader.present();
      if (this.file) {
        const url = await this.vendorMasterService.uploadFile(this.file);
        this.vendorForm.patchValue({ vendorProfileImg: url as string });
      }

      await this.vendorMasterService.addVendor(this.vendorForm.value);

      this.vendorForm.reset();
      this.removePic();
      if (this.vendorForm.controls['id'].value == '')
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
      return;
    }
  }
}
