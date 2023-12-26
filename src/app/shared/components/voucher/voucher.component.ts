import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class VoucherComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  id: string = '1305984445';

  ngOnInit() {}

  openShipmentDetail() {
    this.navCtrl.navigateForward(`main/shipment/${this.id}`, {
      state: { id: this.id },
    });
  }
}
