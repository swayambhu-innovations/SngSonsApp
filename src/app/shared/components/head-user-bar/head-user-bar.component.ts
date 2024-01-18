import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/utils/util';

@Component({
  selector: 'app-head-user-bar',
  templateUrl: './head-user-bar.component.html',
  styleUrls: ['./head-user-bar.component.scss'],
})
export class HeadUserBarComponent implements OnInit {
  constructor(
    private navCtrl: NavController,
    private utilService: UtilService
  ) {}

  openMode: boolean = false;
  userName: string = '';

  ngOnInit() {
    this.getUserName();
  }

  goHome() {
    this.navCtrl.navigateForward('main/home');
  }

  openNotifications() {
    this.navCtrl.navigateForward('main/notifications');
  }

  tabStatus: any = {
    simple: true,
    expert: false,
    custom: false,
  };

  changeTab(id: string) {
    Object.keys(this.tabStatus).forEach((key) => {
      this.tabStatus[key] = false;
    });
    this.tabStatus[id] = true;
  }

  getUserName() {
    const data: any = this.utilService.getUserdata();
    this.userName = data?.access?.userName || '';
  }
}
