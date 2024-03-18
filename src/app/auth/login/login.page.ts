import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Config } from 'src/app/config';
import { NotificationService } from 'src/app/utils/notification';
import { LoginPermissionService } from './login-permission.service';
import {
  Auth,
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  recaptchaVerifier: RecaptchaVerifier | undefined;
  loginForm = new FormGroup({
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    otp: new FormControl(''),
  });

  otpConfirmation: any = null;
  recaptchaWidgetId: any;
  private loader: any;

  constructor(
    private notification: NotificationService,
    public loginPermissionService: LoginPermissionService,
    private loadingController: LoadingController,
    private auth: Auth,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    setTimeout(() => {
      this.recaptchaVerifier = new RecaptchaVerifier(
        this.auth,
        'recaptcha-container',
        { size: 'invisible' }
      );
      this.resetRecaptchaVerifier();
    }, 1000);
    this.loginPermissionService.redirectUser(this.loader);
  }

  resetRecaptchaVerifier() {
    this.recaptchaVerifier?.render().then((widgetId) => {
      this.recaptchaWidgetId = widgetId;
    });
  }

  get isValidNumber() {
    return this.loginForm.value.phone?.toString()?.length == 10;
  }

  get isValidOTP() {
    return (
      this.loginForm.value.otp &&
      this.loginForm.value.otp.toString()?.length > 0
    );
  }

  get isOTPAvailable() {
    return this.loginForm.value.otp && this.loginForm.value.otp == '';
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9]/;
    const allowedSpecialKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
    ];
    const keyPressed = event.key;
    this.loginPermissionService.showOtp = false;

    if (
      !allowedChars.test(keyPressed) &&
      !allowedSpecialKeys.includes(keyPressed)
    ) {
      event.preventDefault();
    }
  }

  async requestOTP(resend: boolean) {
    this.loader.present();
    const phoneNumber = this.loginForm.value.phone;
    if (!phoneNumber) {
      return;
    }
    if (resend) {
      this.loginForm.patchValue({
        otp: '',
      });
      this.resetRecaptchaVerifier();
    }
    if (this.recaptchaVerifier) {
      this.loader.present();
      await signInWithPhoneNumber(
        this.auth,
        `+91${phoneNumber}`,
        this.recaptchaVerifier
      )
        .then((confirmationResult) => {
          this.otpConfirmation = confirmationResult;
          this.loginPermissionService.showOtp = true;
        })
        .catch((error) => {
          this.resetRecaptchaVerifier();
          this.notification.showError(Config.messages.smsError);
          this.loginForm.reset();
        });
      this.loader.dismiss();
    }
    this.loader.dismiss();
  }

  async submitOTP() {
    const otp = this.loginForm.value.otp;
    if (!otp) {
      return;
    }
    this.loader.present();
    this.loginForm.patchValue({
      otp: '',
    });
    await this.otpConfirmation
      .confirm(otp)
      .then(async (result: any) => {
        const user = {
          ...result.user,
          phoneNumber: result.user.phoneNumber.replace('+91', ''),
        };
        this.loginPermissionService.setLocal(user);
        await this.loginPermissionService.redirectUser(this.loader);
        this.loginForm.reset();
        this.loader.dismiss();
      })
      .catch((error: any) => {
        this.loader.dismiss();
        this.notification.showError(Config.messages.invalidOTP);
      });
  }
}
