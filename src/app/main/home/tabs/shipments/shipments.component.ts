import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BarGraphTableComponent } from 'src/app/shared/components/bar-graph-table/bar-graph-table.component';
import { DayWiseSummaryComponent } from 'src/app/shared/components/day-wise-summary/day-wise-summary.component';
import { VoucherComponent } from 'src/app/shared/components/voucher/voucher.component';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss'],
  imports: [
    DayWiseSummaryComponent,
    VoucherComponent,
    BarGraphTableComponent,
    IonicModule,
  ],
  standalone: true,
})
export class ShipmentsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
