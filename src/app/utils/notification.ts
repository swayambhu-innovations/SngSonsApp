import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastController: ToastController) {}
  async presentToast(message: string , color:string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position:'bottom',
      color,
    });

    await toast.present();
  }

  async showSuccess(message:string) {
    await this.presentToast(message , 'success');
  }

  async showError(message:string) {
    await this.presentToast(message , 'danger');
  }

  async showInfo(message:string) {
    await this.presentToast(message , '');
  }
}
