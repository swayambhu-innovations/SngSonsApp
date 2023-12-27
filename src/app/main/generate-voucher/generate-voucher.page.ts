import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-generate-voucher',
  templateUrl: './generate-voucher.page.html',
  styleUrls: ['./generate-voucher.page.scss'],
})
export class GenerateVoucherPage implements OnInit {
  id: any;
  isDone: boolean = false;
  isSuspended: boolean = false;
  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  goBack() {
    this.navCtrl.back();
  }
}
