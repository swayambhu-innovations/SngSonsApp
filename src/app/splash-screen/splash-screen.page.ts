import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { LoginPermissionService } from '../auth/login/login-permission.service';
import { Config } from '../config';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  constructor(
    private loginPermissionService: LoginPermissionService,
    private loadingController: LoadingController,
  ) {}

  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loginPermissionService.redirectUser(loader);
  }
}
