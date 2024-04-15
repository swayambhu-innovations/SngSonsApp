import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { VendorMasterService } from 'src/app/main/settings/component/vendor-master/vendor-master.service';
import { SharedService } from 'src/app/shared/shared.service';
import { NotificationService } from 'src/app/utils/notification';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent  implements OnInit {
  public vendorData: any; // Store data of all Vendors
  public pendingVendorData: any; // Store data of all pending data of Vendors
  public filteredVendors: any; // Store search result
  public config = Config; // fetching constant from app config file
  private loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;

  constructor(
    private vendorMasterService: VendorMasterService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private notificationService: NotificationService,
    private sharedService: SharedService
  ) {
    this.sharedService.refresh.subscribe((data) => {
      if (data) {
        this.init();
      }
    });
  }

  openAddVendorForm() {
    this.navCtrl.navigateForward('main/settings/vendor-master/add-vendor');
    this.init();
  }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.init();
  }

  async ionViewDidEnter() {
    this.init();
  }

  async init() {
    this.loader?.present();
    await this.getVendors();
    this.loader.dismiss();
  }

  async getVendors() {
    const data = await this.vendorMasterService.getVendors();
    this.vendorData = data.docs.map((vendor: any) => {
      return { ...vendor.data(), id: vendor.id };
    });
    this.pendingVendorData = this.vendorData.filter(
      (vendor: any) => vendor?.pending == true
    );
    this.vendorData = this.vendorData.filter(
      (vendor: any) => vendor?.pending == false
    );
    this.filteredVendors = this.vendorData;
  }

  async updVendorStatus($event: any, vendorId: string, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.vendorMasterService.updVendorType(vendorId, status);
    await this.getVendors();
    this.loader.dismiss();
  }

  searchVendor(e: any) {
    const searchValue = e.detail.value;
    if (searchValue && searchValue.trim() !== '') {
      this.filteredVendors = this.vendorData.filter((vendor: any) =>
        vendor.WSName.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else this.filteredVendors = this.vendorData;
  }

  async editDetails(event: any, vendor: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward(['main/settings/vendor-master/add-vendor'], {
      state: { vendor: JSON.stringify(vendor) },
    });
  }

  async openDetails(event: any, vendor: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward(
      [`main/settings/vendor-master/vendor-details/${vendor.id}`],
      {
        state: { vendor: JSON.stringify(vendor) },
      }
    );
  }

  async deleteVendor(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.vendorMasterService.deleteVendor(this.toDelete.id);
      await this.getVendors();
      this.loader.dismiss();
      this.notificationService.showSuccess(
        this.config.messages.deletedSuccessfully
      );
    }
    this.showConfirm = false;
  }
}