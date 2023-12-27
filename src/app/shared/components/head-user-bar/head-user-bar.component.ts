import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-head-user-bar',
  templateUrl: './head-user-bar.component.html',
  styleUrls: ['./head-user-bar.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class HeadUserBarComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  openMode: boolean = false;

  ngOnInit() {}

  goHome() {
    this.navCtrl.navigateForward('main/home');
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
}
