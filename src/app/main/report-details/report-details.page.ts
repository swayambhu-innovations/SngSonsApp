import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.page.html',
  styleUrls: ['./report-details.page.scss'],
})
export class ReportDetailsPage implements OnInit {
  id: any;
  date1: string = '13 Aug';
  date2: string = '13 Sep';
  tableData: any;
  openColVariables: boolean = false;
  tableColumns: any;
  isTableReady:boolean =  true;
  activeColumnCount: number;
  minimumActiveCount: number = 2;
  constructor(private navCtrl: NavController, private route: ActivatedRoute) {
    this.tableColumns = [
      {
        text: 'S No',
        identifier : 'sno',
        isActive: true
      },
      {
        text: 'W/S code',
        identifier : 'wscode',
        isActive: true
      },
      {
        text: 'Party name',
        identifier : 'pname',
        isActive: true
      },
      {
        text: 'Area',
        identifier : 'area',
        isActive: true
      },
      {
        text: 'Col 5',
        identifier : 'col5',
        isActive: true
      },
      {
        text: 'Col 6',
        identifier : 'col6',
        isActive: true
      }
    ];
    this.activeColumnCount = this.tableColumns.length;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tableData = {
      activeColumns: [
        {
          text: 'S No',
          identifier : 'sno'
        },
        {
          text: 'W/S code',
          identifier : 'wscode'
        },
        {
          text: 'Party name',
          identifier : 'pname'
        },
        {
          text: 'Area',
          identifier : 'area'
        },
        {
          text: 'Col 5',
          identifier : 'col5'
        },
      ],
      tableData: [
        {
          "sno" : '1',
          'wscode' : "001",
          'pname' : "H & N",
          'area': "area 1",
          'col5': "col5",
          'col6' : "col6"
        },
        {
          "sno" : '2',
          'wscode' : "002",
          'col6' : "col6 2",
          'pname' : "R K Brothers",
          'area': "area 2",
          'col5': "col5 2",
        },
        {
          "sno" : '3',
          'wscode' : "003",
          'pname' : "S & T sons",
          'area': "area 3",
          'col5': "col5 3",
          'col6' : "col6 3"
        },
        {
          "sno" : '4',
          'wscode' : "004",
          'pname' : "P & Sons",
          'area': "area 4",
          'col5': "col5 4",
          'col6' : "col6 4"
        }
      ]
    }
  }

  onChangeColumn(columnItem:any){
    this.tableColumns.map((item:any) => {
      if(item.identifier == columnItem.identifier){
        item.isActive = (!columnItem.isActive);
      }
    });
    const activeColumnVar = this.tableColumns.filter((item:any) => item.isActive);
    this.activeColumnCount = activeColumnVar.length;
    this.isTableReady = false;
    this.tableData = {
      activeColumns: activeColumnVar,
      tableData: [
        {
          "sno" : '1',
          'wscode' : "001",
          'pname' : "H & N",
          'area': "area 1",
          'col5': "col5",
          'col6' : "col6"
        },
        {
          "sno" : '2',
          'wscode' : "002",
          'pname' : "R K Brothers",
          'area': "area 2",
          'col5': "col5 2",
          'col6' : "col6 2"
        },
        {
          "sno" : '3',
          'wscode' : "003",
          'pname' : "S & T sons",
          'area': "area 3",
          'col5': "col5 3",
          'col6' : "col6 3"
        },
        {
          "sno" : '4',
          'wscode' : "004",
          'pname' : "P & Sons",
          'area': "area 4",
          'col5': "col5 4",
          'col6' : "col6 4"
        }
      ]
    };
    setTimeout(() => {
      this.isTableReady = true;
    }, 10);
    
  }

  goBack() {
    this.navCtrl.back();
  }

  dispDate(convertDate: any) {
    const date: any = new DatePipe('en-US').transform(convertDate, 'dd MMM');
    return date?.toString();
  }

  startDate(e: any) {
    this.date1 = this.dispDate(e.target.value);
  }

  endDate(e: any) {
    this.date2 = this.dispDate(e.target.value);
  }
}
