import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tabStatus: any = {
    shipments: true,
    vehicles: false,
    vendors: false,
  };

  changeTab(id: string) {
    Object.keys(this.tabStatus).forEach((key) => {
      this.tabStatus[key] = false;
    });
    this.tabStatus[id] = true;
  }

  ngOnInit() {}
}
