import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmationComponent } from '../main/common/confirmation/confirmation.component';
import { VoucherComponent } from './components/voucher/voucher.component';
import { ReportTableComponent } from './components/report-table/report-table.component';
import { DayWiseSummaryComponent } from './components/day-wise-summary/day-wise-summary.component';
import { BarGraphTableComponent } from './components/bar-graph-table/bar-graph-table.component';
import { AccordionTypeExpensesComponent } from './components/accordion-type-expenses/accordion-type-expenses.component';
import { CustomComponent } from './components/head-user-bar/tabs/custom/custom.component';
import { ExpertComponent } from './components/head-user-bar/tabs/expert/expert.component';
import { SimpleComponent } from './components/head-user-bar/tabs/simple/simple.component';
import { HeadUserBarComponent } from './components/head-user-bar/head-user-bar.component';
import { RecievingVoucherComponent } from './components/recieving-voucher/recieving-voucher.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ConfirmationComponent,
    VoucherComponent,
    ReportTableComponent,
    DayWiseSummaryComponent,
    BarGraphTableComponent,
    AccordionTypeExpensesComponent,
    HeadUserBarComponent,
    SimpleComponent,
    RecievingVoucherComponent,
    ExpertComponent,
    CustomComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ConfirmationComponent,
    VoucherComponent,
    ReportTableComponent,
    DayWiseSummaryComponent,
    BarGraphTableComponent,
    AccordionTypeExpensesComponent,
    RecievingVoucherComponent,
    HeadUserBarComponent,
    SimpleComponent,
    ExpertComponent,
    CustomComponent,
  ],
})
export class SharedModule {}
