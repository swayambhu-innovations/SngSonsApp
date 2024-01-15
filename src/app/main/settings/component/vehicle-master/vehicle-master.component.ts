import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.scss'],
})
export class VehicleMasterComponent implements OnInit {
  public vehicleCategoryId: string = '';
  public vehicleCategoryName: string = '';
  public vehicleCat: any;

  constructor() {}

  ngOnInit(): void {
    if (history.state.vehicleCat) {
      this.vehicleCat = JSON.parse(history.state.vehicleCat);
      this.vehicleCategoryId = this.vehicleCat.id;
      this.vehicleCategoryName = this.vehicleCat.vehicleCatName;
    }
  }
}
