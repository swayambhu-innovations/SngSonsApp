import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  @Input() heading = '';
  @Input() search = '';

  id: string = '1305984445';

  ngOnInit() {}

  openShipmentDetail() {
    this.navCtrl.navigateForward(`main/shipment/${this.id}`, {
      state: { id: this.id },
    });
  }
}
