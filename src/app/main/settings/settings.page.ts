import { Component } from '@angular/core';
import { LoadingController, ViewWillEnter } from '@ionic/angular';
import { LoginPermissionService } from 'src/app/auth/login/login-permission.service';
import { Config } from 'src/app/config';
import { FileuploadService } from 'src/app/utils/fileupload';
import { UtilService } from 'src/app/utils/util';
import { UserPermissionService } from './component/user-permission/user-permission.service';
import * as moment from 'moment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements ViewWillEnter {

  constructor(
    private loginPermissionService: LoginPermissionService,
    private loadingController: LoadingController,
    private fileuploadService: FileuploadService,
    private utilService: UtilService,
    private userPermissionService: UserPermissionService
  ) { }

  displayImage: string = '';
  showLogout = false;
  userData: any = {};
  loader: any;

  async ionViewWillEnter() {
    this.getUserData();
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  async changePhoto(e: any) {
    this.loader.present();
    const file = e.target.files[0];
    const url = await this.fileuploadService.uploadFile(file, Config.storage.userPhoto, `${this.userData.access.id}.${file.name.split('.').pop()}`);
    this.displayImage = url;
    await this.updUserPhoto(url);
    this.utilService.setUserdata({photoURL: url});
    this.loader.dismiss();
  }

  get createdDate() {
    let createdAt = this.userData.access?.createdAt;
    if (createdAt) {
      return `Profile Created ${this.utilService.getDateCreatedBefore(createdAt.seconds * 1000)} ago`;
    }
    return '';
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

  getUserData() {
    const user: any = localStorage.getItem(Config.localStorage.userdata);
    if (!user) {
        return;
    }
    this.userData = JSON.parse(user);
    if (!this.userData.photoURL) {
      this.displayImage = `${Config.url.dicebear}${this.userData.access.userName}`;
    } else {
      this.displayImage = this.userData.photoURL;
    }
  }

  async updUserPhoto(url: string) {
    await this.userPermissionService.updUserPhoto(this.userData.access.id, url);
  }
}
