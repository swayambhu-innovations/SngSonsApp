import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NotificationService } from 'src/app/utils/notification';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  constructor(
    private NotificationService: NotificationService,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {}

  loader: any;

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  itemForm: FormGroup = new FormGroup({
    itemName: new FormControl('', [Validators.required]),
    srn: new FormControl('', [Validators.required]),
    quantity: new FormControl(10, [Validators.required]),
    purchaseDate: new FormControl('', [Validators.required]),
    expiryDate: new FormControl('', [Validators.required]),
    warranty: new FormControl('', [Validators.required]),
    itemType: new FormControl('', [Validators.required]),
    careTaker: new FormControl('', [Validators.required]),
    renewalDays: new FormControl(10, [Validators.required]),
  });

  maintenanceForm: FormGroup = new FormGroup({
    note: new FormControl('', [Validators.required]),
  });
  

  purchaseDate: Date = moment(new Date()).startOf('month').toDate();
  expiryDate: Date = moment(new Date()).startOf('month').toDate();

  increaseQuantity() {
    this.itemForm.value.quantity++;
  }
  increaseRewDays() {
    this.itemForm.value.renewalDays++;
  }
  decreaseQuantity() {
    if (this.itemForm.value.quantity > 5) {
      this.itemForm.value.quantity--;
    }
  }
  decreaseReDays() {
    if (this.itemForm.value.renewalDays > 5) {
      this.itemForm.value.renewalDays--;
    }
  }

  updatePurchaseDate(e: any) {
    this.purchaseDate = moment(e.target.value).toDate();
    this.itemForm.patchValue({
      purchaseDate: this.purchaseDate,
    });
  }

  updateExpiryDate(e: any) {
    this.expiryDate = moment(e.target.value).toDate();
    this.itemForm.patchValue({
      expiryDate: this.expiryDate,
    });
  }

  formatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }

  // async onSubmit() {
  //   if (this.itemForm.invalid) {
  //     this.itemForm.markAllAsTouched();
  //     return;
  //   }
  //   this.loader.present();
  //   try {
  //     console.log(this.itemForm.value);
  //   } catch (err) {
  //     console.log('error');
  //   }
  //   this.itemForm.reset();
  //   this.loader.dismiss();
  // }


  //Mark Maintenance Done
  // async onSubmit() {
  //   if (this.maintenanceForm.invalid) {
  //     this.itemForm.markAllAsTouched();
  //     return;
  //   }
  //   this.loader.present();
  //   try {
  //     console.log(this.maintenanceForm.value);
  //   } catch (err) {
  //     console.log('error');
  //   }
  //   this.maintenanceForm.reset();
  //   this.loader.dismiss();
  // }
}
