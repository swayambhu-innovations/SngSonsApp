import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { SimpleComponent } from './tabs/simple/simple.component';
import { ExpertComponent } from './tabs/expert/expert.component';
import { CustomComponent } from './tabs/custom/custom.component';

@Component({
  selector: 'app-head-user-bar',
  templateUrl: './head-user-bar.component.html',
  styleUrls: ['./head-user-bar.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    SimpleComponent,
    ExpertComponent,
    CustomComponent,
  ],
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
