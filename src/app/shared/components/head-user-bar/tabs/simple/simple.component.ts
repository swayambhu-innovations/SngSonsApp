import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class SimpleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
