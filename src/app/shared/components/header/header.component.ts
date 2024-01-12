import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../shared.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerName: any;
  // @Input() backUrl: string = '/main/settings';
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
