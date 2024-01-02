import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-post-delivery',
  templateUrl: './post-delivery.page.html',
  styleUrls: ['./post-delivery.page.scss'],
})
export class PostDeliveryPage implements OnInit {
  id: any;
  isCompleted: boolean = false;
  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

  invoiceSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';
  MLRAcknSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  goBack() {
    this.navCtrl.back();
  }

  uploadInvoice(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.invoiceSrc = reader.result;
    };
  }

  removeInv() {
    this.invoiceSrc =
      'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';
  }

  uploadAckn(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.MLRAcknSrc = reader.result;
    };
  }

  removeMLR() {
    this.MLRAcknSrc =
      'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';
  }
}
