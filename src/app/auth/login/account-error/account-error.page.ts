import { Component, OnInit } from '@angular/core';
import { LoginPermissionService } from '../login-permission.service';
import { LoadingController } from '@ionic/angular';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-account-error',
  templateUrl: './account-error.page.html',
  styleUrls: ['./account-error.page.scss'],
})
export class AccountErrorPage implements OnInit {
  loader: any;
  constructor(
    private loginPermissionService: LoginPermissionService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  async refresh() {
    this.loader = await this.loadingController.create({
      message: Config.messages.refresh,
    });
    this.loginPermissionService.redirectUser(this.loader);
  }

  async logout() {
    this.loader = await this.loadingController.create({
      message: Config.messages.logginOut,
    });
    this.loginPermissionService.logout(this.loader);
  }
}
