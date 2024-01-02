import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetForm = new FormGroup({
    email: new FormControl(''),
  });
  isPassReset: boolean = false;
  isError: boolean = false;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  resetPassword(): void {
    this.isPassReset = !this.isPassReset;
  }

  raiseError(): void {
    this.isPassReset = !this.isPassReset;
    this.isError = !this.isError;
  }

  openHome(): void {
    this.isPassReset = !this.isPassReset;
    this.navCtrl.navigateForward('main/home');
  }
}
