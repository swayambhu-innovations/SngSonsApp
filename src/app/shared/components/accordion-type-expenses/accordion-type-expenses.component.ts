import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion-type-expenses',
  templateUrl: './accordion-type-expenses.component.html',
  styleUrls: ['./accordion-type-expenses.component.scss'],
})
export class AccordionTypeExpensesComponent implements OnInit {
  @Input() heading = '';
  constructor() {}

  ngOnInit() {}
}
