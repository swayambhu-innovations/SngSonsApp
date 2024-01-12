import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public isNotifications: boolean = true;

  constructor(
    private sharedService: SharedService,
    private navCtrl: NavController
  ) {}

  public notificationIcons: any = {
    shipmentPending: 'assets/icon/shipment-pending.svg',
    shipmentSuspended: 'assets/icon/shipment-suspended.svg',
    shipmentCompleted: 'assets/icon/shipment-completed.svg',
    voucherGenerated: 'assets/icon/voucher-generated.svg',
    accounts: 'assets/icon/accounts.svg',
    expenseCategories: 'assets/icon/expense-cate.svg',
    vehicles: 'assets/icon/vehicles.svg',
    vendors: 'assets/icon/vendors.svg',
  };

  ngOnInit() {}

  refresh() {
    this.sharedService.refresh.next(true);
  }

  goBack() {
    this.navCtrl.back();
  }
}
