import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { SuppliersService } from '../suppliers.service';
import { NotificationService } from 'src/app/utils/notification';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.page.html',
  styleUrls: ['./supplier-details.page.scss'],
})
export class SupplierDetailsPage implements OnInit {
  public supplierData: any;
  private loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;

  constructor(
    private supplierService: SuppliersService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    if (history.state.supplier)
      this.supplierData = JSON.parse(history.state.supplier);
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  async updVendorStatus($event: any, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.supplierService.updVendorType(this.supplierData?.id, status);
    this.loader.dismiss();
  }

  goBack() {
    this.navCtrl.back();
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
      await this.supplierService.deleteVendor(this.toDelete.id);
      this.loader.dismiss();
      this.notificationService.showSuccess(Config.messages.deletedSuccessfully);
      this.navCtrl.navigateForward(['main/settings/vendor-master']);
    }
    this.showConfirm = false;
  }
}
