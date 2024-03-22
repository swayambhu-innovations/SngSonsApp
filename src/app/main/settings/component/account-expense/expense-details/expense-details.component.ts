import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { NotificationService } from 'src/app/utils/notification';
import { AccountExpenseService } from '../account-expense.service';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss'],
})
export class ExpenseDetailsComponent implements OnInit {
  private loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;
  public expenseData: any; // store details of expense

  constructor(
    private navCtrl: NavController,
    private accountExpenseService: AccountExpenseService,
    private loadingController: LoadingController,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    if (history.state.expense)
      this.expenseData = JSON.parse(history.state.expense);

    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    console.log(this.expenseData);
  }

  async updExpenseStatus($event: any, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    // await this.accountExpenseService.updExpenseType(
    //   this.expenseType,
    //   this.vehicleData.id,
    //   status
    // );
    this.loader.dismiss();
  }

  async editDetails(event: any) {
    event.stopPropagation();
    // this.navCtrl.navigateForward('/main/settings/vehicle-master/add-vehicle', {
    //   state: {
    //     vehicle: JSON.stringify(this.vehicleData),
    //     vehicleCategry: JSON.stringify(this.vehicleCat),
    //     vehicleCategories: JSON.stringify(this.categories),
    //   },
    // });
  }

  async deleteExpense(confirmation: any) {
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
