import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { NotificationService } from 'src/app/utils/notification';
import { AccountExpenseService } from '../account-expense.service';
import { Config } from 'src/app/config';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  private loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;
  public accountData: any; // store details of account
  public accountList: any;
  public openAccount = false;
  tableData = [
    { name: 'Shipment ID', key: 'ShipmentNumber', size: '4' },
    { name: 'Party Name', key: 'CustomerName', size: '3' },
    { name: 'Area', key: 'WSTown', size: '3' },
  ];

  accountForm: FormGroup = new FormGroup({
    accountName: new FormControl('', [Validators.required]),
    shipmentLimit: new FormControl('', [Validators.required]),
    dispenseLimit: new FormControl('', [Validators.required]),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
  });
  public initialAccountValues = this.accountForm.value;

  constructor(
    private navCtrl: NavController,
    private notification: NotificationService,
    private accountExpenseService: AccountExpenseService,
    private loadingController: LoadingController,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    if (history.state.account)
      this.accountData = JSON.parse(history.state.account);

    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  async updAccountStatus($event: any, accountId: string, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.accountExpenseService.updAccountStatus(accountId, status);
    this.loader.dismiss();
  }

  editAccount(account: any) {
    this.accountForm.setValue(account);
    this.openAccount = true;
  }

  async deleteAccount(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      //   await this.vehicleMasterService.deleteVehicle(
      //     this.vehicleCat.id,
      //     this.toDelete.id
      //   );
      this.loader.dismiss();
      this.notificationService.showSuccess(Config.messages.deletedSuccessfully);
      this.navCtrl.navigateForward(['main/settings/vehicle-master']);
    }
    this.showConfirm = false;
  }

  goBack() {
    this.navCtrl.back();
  }
}
