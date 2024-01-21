import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent implements OnInit {
  tableData = [
    { name: 'Name.', key: 'CustomerName', size: '4' },
    { name: 'W/S Code', key: 'WSCode', size: '3' },
    { name: 'Area', key: 'WSTown', size: '3' }
  ];
  constructor() {}

  ngOnInit() {}
}
