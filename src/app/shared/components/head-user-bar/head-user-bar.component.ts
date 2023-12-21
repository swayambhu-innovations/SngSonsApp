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

  ngOnInit() {}

  goHome() {
    this.navCtrl.navigateForward('main/home');
  }
}
