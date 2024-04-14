import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss'],
})
export class PartiesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  tabStatus: any = {
    vendors: true,
    suppliers: false,
  };

  changeTab(id: string) {
    Object.keys(this.tabStatus).forEach((key) => {
      this.tabStatus[key] = false;
    });
    this.tabStatus[id] = true;
  }
}
