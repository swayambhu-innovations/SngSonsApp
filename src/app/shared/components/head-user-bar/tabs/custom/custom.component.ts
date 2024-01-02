import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class CustomComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
