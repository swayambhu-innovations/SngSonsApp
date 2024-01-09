import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginPermissionService } from 'src/app/auth/login/login-permission.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  displayImage: any =
    'https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697';
  constructor(
    private loginPermissionService: LoginPermissionService,
    private loadingController: LoadingController
  ) {}

  showLogout = false;

  ngOnInit() {}

  imgRead(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.displayImage = reader.result;
    };
  }

  dismissModal = async () => {
    this.showLogout = false;
    return true;
}

  async logout() {
    const loader = await this.loadingController.create({
      message: 'Please wait...',
    });
    this.showLogout = false;
    this.loginPermissionService.logout(loader);
  }
}
