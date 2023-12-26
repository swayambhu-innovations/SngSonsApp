import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AccordionTypeExpensesComponent } from 'src/app/shared/components/accordion-type-expenses/accordion-type-expenses.component';
import { BarGraphTableComponent } from 'src/app/shared/components/bar-graph-table/bar-graph-table.component';
import { DayWiseSummaryComponent } from 'src/app/shared/components/day-wise-summary/day-wise-summary.component';
import { VoucherComponent } from 'src/app/shared/components/voucher/voucher.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  imports: [
    DayWiseSummaryComponent,
    VoucherComponent,
    BarGraphTableComponent,
    AccordionTypeExpensesComponent,
    IonicModule,
  ],
  standalone: true,
})
export class VehiclesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
