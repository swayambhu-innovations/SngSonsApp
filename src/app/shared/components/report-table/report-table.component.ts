import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit {
  @Input() tableData: any;
  reportTableData: any;
  reportTableActiveColumns : any;
  constructor() {}

  ngOnInit() {
    this.reportTableData = this.tableData['tableData'];
    this.reportTableActiveColumns = this.tableData['activeColumns'];

  }

  ionViewDidEnter(){
    
  }
}
