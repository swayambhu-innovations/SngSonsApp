import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit, OnChanges {
  @Input() tableData: any;
  reportTableData: any;
  reportTableActiveColumns : any;
  constructor() {}

  ngOnInit() {
    
  }
  ngOnChanges(changes: SimpleChanges){
    if(changes?.['tableData']){
      this.reportTableData = changes['tableData']?.currentValue?.['tableData'];
      this.reportTableActiveColumns = changes['tableData']?.currentValue?.['activeColumns'];
    }
  }

  ionViewWillEnter(){
    
  }
}
