import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  tableData = [
    { name: 'Vehicle No.', key: 'LorryNo', size: '4' },
    { name: 'Party Name', key: 'CustomerName', size: '3' },
    { name: 'Area', key: 'WSTown', size: '3' }
  ];
  constructor() {}

  ngOnInit() {}
}
