import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Config } from 'src/app/config';
import { BusinessInfoService } from './service/business-info.service';
import { FileuploadService } from 'src/app/utils/fileupload';
import { NotificationService } from 'src/app/utils/notification';
import { LoadingController ,NavController} from '@ionic/angular';

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.page.html',
  styleUrls: ['./business-info.page.scss'],
})
export class BusinessInfoPage implements OnInit {
  constructor(
    private BusinessInfoService: BusinessInfoService,
    private fileuploadService: FileuploadService,
    private NotificationService: NotificationService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
  ) {}

  loader: any;
  businessInfoForm: FormGroup = new FormGroup({
    img: new FormControl(Config.url.defaultProfile),
    businessName: new FormControl('', [Validators.required]),
    gst: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    radius: new FormControl(10, [Validators.required]),
  });

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    await this.BusinessInfoService.getBusinessInfo().then((data) => {
      let businessInfo = data?.data();
      if (businessInfo) {
        this.businessInfoForm.setValue(businessInfo);
      } else {
        console.warn('No business info found.');
      }
    });
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    const url = await this.fileuploadService.uploadFile(
      file,
      Config.storage.businessProfile,
      `${'businessProfile'}`
    );
    this.businessInfoForm.patchValue({
      img: url,
    });
  }

  increaseRadius() {
    this.businessInfoForm.value.radius++;
  }
  decreaseRadius() {
    if (this.businessInfoForm.value.radius > 5) {
      this.businessInfoForm.value.radius--;
    }
  }
  async onSubmit() {
    if (this.businessInfoForm.invalid) {
      this.businessInfoForm.markAllAsTouched();
      this.NotificationService.showError(Config.messages.fillAllFields);
      return;
    } else {
      this.loader.present();
      await this.BusinessInfoService.updateBusinessInfo(
        this.businessInfoForm.value
      ).then(() => {
        this.NotificationService.showSuccess(
          Config.messages.updatedSuccessfully
        );
      });
      this.loader.dismiss();
      this.navCtrl.back();
    }
  }
}
