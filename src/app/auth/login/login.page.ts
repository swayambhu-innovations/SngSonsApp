import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Config } from 'src/app/config';
import { NotificationService } from 'src/app/utils/notification';
import { LoginPermissionService } from './login-permission.service';
import { Auth, RecaptchaVerifier, getAuth, signInWithPhoneNumber } from '@angular/fire/auth';
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
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    otp: new FormControl(''),
  });

  showOtp = false;
  otpConfirmation: any = null;
  recaptchaWidgetId: any;
  private loader: any;

  userData = {
      "uid": "X6Ga1S7V4mcPYOkGH4kSnlXN2aZ2",
      "emailVerified": false,
      "isAnonymous": false,
      "phoneNumber": "9045159889",
      "providerData": [
          {
              "providerId": "phone",
              "uid": "+919045159889",
              "displayName": null,
              "email": null,
              "phoneNumber": "+919045159889",
              "photoURL": null
          }
      ],
      "stsTokenManager": {
          "refreshToken": "AMf-vBxhhKl-5nXR9tXzb53QxSpvVg1qtdVAQY2OO7FiEf2L2cZ8y88mcbIqKHnzEf1IxgPVngDofShni37mJ-elv8A3nr3iYnx3HdQuVq2q44nq0YOtGLwImykSUizqIrmVo7i-H_2bEe9pV7oIODFxFnAXFA3qjIfQ7lOaBa4ckSDv3axjGoQ",
          "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5NDE1ZWMyM2EzMzdlMmJiYWE1ZTNlNjhiNjZkYzk5MzY4ODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc25ndGVzYyIsImF1ZCI6InNuZ3Rlc2MiLCJhdXRoX3RpbWUiOjE3MDQ4MjA2MDUsInVzZXJfaWQiOiJYNkdhMVM3VjRtY1BZT2tHSDRrU25sWE4yYVoyIiwic3ViIjoiWDZHYTFTN1Y0bWNQWU9rR0g0a1NubFhOMmFaMiIsImlhdCI6MTcwNDgyMDYwNSwiZXhwIjoxNzA0ODI0MjA1LCJwaG9uZV9udW1iZXIiOiIrOTE5MDQ1MTU5ODg5IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrOTE5MDQ1MTU5ODg5Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.Uz5U1FPzp0xOmLujLrbGrlZcCgd_3mTnY-iVMjoBlBDJCv5mao7RlmIZSsniMeInuF3uFcp59h8oIzhWRZACzG4tvHl46Ex6_AN2Bmghbe6XrpkXgxiX_LySTh00yfIQBN6vu-3zTnTxo0dXGgqCPnfLTcbCiFkP_10mPngzcakw7A5bIiLyCaWUt8oKIeNkY94ztaTXBDFiZmP3UHURp7v30t4dGW4ynGeHcKgSqpIkajEIfxZcOcQYKCZbLEXKoZ1zLg3wpt8ohqyohMw_Bd1UuQlmRo5eKZtJd2IoqdwUYOqmznlPeD3UJ680_0Cl4oXgCVEsnLzSRuDmxVD96w",
          "expirationTime": 1704824206886
      },
      "createdAt": "1704820605798",
      "lastLoginAt": "1704820605799",
      "apiKey": "AIzaSyBsbI5OXoOIqGYaMr5lek8ENeuiDowsDYw",
      "appName": "[DEFAULT]"
  }

  constructor(
    private notification: NotificationService,
    private loginPermissionService: LoginPermissionService,
    private loadingController: LoadingController,
    private auth: Auth,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loader = await this.loadingController.create({ message: Config.messages.pleaseWait });
    setTimeout(() => {
      this.recaptchaVerifier = new RecaptchaVerifier(
        this.auth,
        'recaptcha-container',
        { size: 'invisible' },
      );
      this.resetRecaptchaVerifier();
    }, 1000);
    // this.loginPermissionService.setLocal(this.userData);
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
    return this.loginForm.value.otp && this.loginForm.value.otp.toString()?.length > 0;
  }

  limitInputLength($event: any, maxLength = 10) {
    if($event.target.value.length>=maxLength) {
        $event.preventDefault();
        return;
    }
  }

  async requestOTP(resend = false) {
    const phoneNumber = this.loginForm.value.phone;
    if (!phoneNumber) {
      return;
    }
    if (resend) {
      this.resetRecaptchaVerifier();
    }
    this.loader.present();
    if (this.recaptchaVerifier) {
      await signInWithPhoneNumber(this.auth, `+91${phoneNumber}`, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.otpConfirmation = confirmationResult;
        this.showOtp = true;
      }).catch((error) => {
        this.resetRecaptchaVerifier();
        this.notification.showError(Config.messages.smsError);
      });
    }
    this.loader.dismiss();
  }

  async submitOTP() {
    const otp = this.loginForm.value.otp;
    if (!otp) {
      return;
    }
    this.loader.present();
    await this.otpConfirmation.confirm(otp).then((result: any) => {
      const user = { ...result.user, phoneNumber: result.user.phoneNumber.replace('+91', '') };
      this.loginPermissionService.setLocal(user);
      this.loginPermissionService.redirectUser(this.loader);
    }).catch((error: any) => {
      this.notification.showError(Config.messages.invalidOTP);
    });
    this.loader.dismiss();
  }

}
