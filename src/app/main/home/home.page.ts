import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'src/app/utils/autoUnsubscriber';

@AutoUnsubscribe
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tabStatus: any = {
    recieving: true,
    operations: false,
    dispatch: false,
  };

  changeTab(id: string) {
    Object.keys(this.tabStatus).forEach((key) => {
      this.tabStatus[key] = false;
    });
    this.tabStatus[id] = true;
  }

  ngOnInit() {}
}
