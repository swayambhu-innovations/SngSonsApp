import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { VendorMasterService } from '../vendor-master.service';
import { NotificationService } from 'src/app/utils/notification';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss'],
})
export class VendorDetailsComponent implements OnInit {
  public vendorData: any;
  private loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;

  constructor(
    private vendorMasterService: VendorMasterService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    if (history.state.vendor)
      this.vendorData = JSON.parse(history.state.vendor);
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  async updVendorStatus($event: any, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.vendorMasterService.updVendorType(this.vendorData?.id, status);
    this.loader.dismiss();
  }

  async editDetails(event: any, vendor: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward(['main/settings/vendor-master/add-vendor'], {
      state: { vendor: JSON.stringify(vendor) },
    });
  }

  async deleteVendor(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.vendorMasterService.deleteVendor(this.toDelete.id);
      this.loader.dismiss();
      this.notificationService.showSuccess(Config.messages.deletedSuccessfully);
      this.navCtrl.navigateForward(['main/settings/vendor-master']);
    }
    this.showConfirm = false;
  }
}
