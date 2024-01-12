import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public isNotifications: boolean = true;

  constructor(
    private sharedService: SharedService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  refresh() {
    this.sharedService.refresh.next(true);
  }

  goBack() {
    this.navCtrl.back();
  }
}
