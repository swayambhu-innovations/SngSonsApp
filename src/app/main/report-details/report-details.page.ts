import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import { ImportExportService } from '../settings/component/import-export/import-export.service';

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
  reportData: any;
  openColVariables: boolean = false;
  tableColumns: any;
  isTableReady:boolean =  true;
  activeColumnCount: number;
  minimumActiveCount: number = 2;

  shipments: any;
  selectedDate: any;
  vendors: any;
  constructor(
    private navCtrl: NavController, 
    private route: ActivatedRoute,
    private shipmentService: ShipmentsService,
    private importExportService: ImportExportService,
  ) {
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
    
  }
  
  ionViewWillEnter(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.getReport(this.id);
    //this.onChangeColumn();
  }

  onChangeColumn(columnItem?:any){
    if(columnItem){
      this.tableColumns.map((item:any) => {
        if(item.identifier == columnItem.identifier){
          item.isActive = (!columnItem.isActive);
        }
      });
    }
    const activeColumnVar = this.tableColumns.filter((item:any) => item.isActive);
    this.activeColumnCount = activeColumnVar.length;
    this.isTableReady = false;
    this.tableData = {
      activeColumns: activeColumnVar,
      tableData: this.reportData
    };
    setTimeout(() => {
      this.isTableReady = true;
    }, 10);
    
  }

  getReport(report:string){
    if(report.toLowerCase() == "vendor wise expenses report"){
      this.vendors = this.shipmentService.vendorsById;
      this.shipmentService.getAllShipments().then((shipmentData) => {
        this.shipments =  shipmentData.docs.map((shipment) => {
          shipment.data()['vendorData'].map((data:any) => {
            if(!data.vendor){
              return;
            }
            if(!(this.vendors[data.vendor]?.['shipments'])){
              this.vendors[data.vendor]['shipments'] = [];
              const vendorShipment = [];
              vendorShipment.push(data);
              const shipmentObject = {
                fullShipment : shipment.data(),
                vendorShipment : vendorShipment
              }
              this.vendors[data.vendor]['shipments'].push(shipmentObject);
            }
            else{
              const shipmentIndex = this.vendors[data.vendor]['shipments'].length;
              if(this.vendors[data.vendor]['shipments'][shipmentIndex - 1]){
                this.vendors[data.vendor]['shipments'][shipmentIndex - 1]['vendorShipment'].push(data);
              }
              else{
                const vendorShipment = [];
                vendorShipment.push(data);
                const shipmentObject = {
                  fullShipment : shipment.data(),
                  vendorShipment : vendorShipment
                }
                this.vendors[data.vendor]['shipments'].push(shipmentObject);
              }
            }
           
          });
          return { ...shipment.data(), id: shipment.id };
        });
        this.tableColumns = [
          {
            text: 'S No',
            identifier : 'serialNo',
            isActive: true
          },
          {
            text: 'W/S code',
            identifier : 'WSCode',
            isActive: true
          },
          {
            text: 'W/S name',
            identifier : 'WSName',
            isActive: true
          },
          {
            text: 'Shipment Count',
            identifier : 'shipmentCount',
            isActive: true
          },
        ];
        this.activeColumnCount = this.tableColumns.length;
        let vendorCount = 0;
        Object.keys(this.vendors).map((vendor:any) => {
          vendorCount++;
          this.vendors[vendor]['serialNo'] = vendorCount;
          this.vendors[vendor]['shipmentCount'] = this.vendors[vendor].shipments?.length || 0;
        });
        this.reportData = Object.keys(this.vendors).map((key) => this.vendors[key]);
        this.onChangeColumn();
        // const filtered = Object.keys(this.vendors).filter((item:any) => {
        //   return this.vendors[item].shipments?.length > 1;
        // });
        // console.log(filtered);
      });
    }
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
