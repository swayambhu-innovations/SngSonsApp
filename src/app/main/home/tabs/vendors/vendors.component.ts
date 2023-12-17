import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AccordionTypeExpensesComponent } from 'src/app/main/components/accordion-type-expenses/accordion-type-expenses.component';
import { BarGraphTableComponent } from 'src/app/main/components/bar-graph-table/bar-graph-table.component';
import { DayWiseSummaryComponent } from 'src/app/main/components/day-wise-summary/day-wise-summary.component';
import { VoucherComponent } from 'src/app/main/components/voucher/voucher.component';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
  imports: [
    DayWiseSummaryComponent,
    VoucherComponent,
    BarGraphTableComponent,
    AccordionTypeExpensesComponent,
    IonicModule,
  ],
  standalone: true,
})
export class VendorsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
