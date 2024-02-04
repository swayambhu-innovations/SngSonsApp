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
    this.tableData = {
      activeColumns: activeColumnVar,
      tableData: this.reportData
    };
  }

  getReport(report:string){
    if(report.toLowerCase() == "vendor wise expenses report"){
      
      this.shipmentService.getAllShipments().then((shipmentData) => {
        this.vendors = this.shipmentService.vendorsById;
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
            isActive: true,
            width: 1
          },
          {
            text: 'W/S code',
            identifier : 'WSCode',
            isActive: true,
            width: 3
          },
          {
            text: 'W/S name',
            identifier : 'WSName',
            isActive: true,
            width: 5
          },
          {
            text: 'Shipment Count',
            identifier : 'shipmentCount',
            isActive: true,
            width: 3
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
      });
    }
    else if(report.toLowerCase() == "vehicle wise expenses report"){
      
      this.shipmentService.getAllShipments().then((shipmentData) => {
        const vehicleData:any = {};
        this.shipments =  shipmentData.docs.map((shipment) => {
          if(!vehicleData[shipment.data()['vehicle']]){
            vehicleData[shipment.data()['vehicle']] = {
              dataArray: [],
              vehicle : {}
            };
          }
          vehicleData[shipment.data()['vehicle']] = {...vehicleData[shipment.data()['vehicle']],...shipment.data()};
          vehicleData[shipment.data()['vehicle']].dataArray.push({...shipment.data()});
          return { ...shipment.data(), id: shipment.id };
        });
        this.tableColumns = [
          {
            text: 'S No',
            identifier : 'serialNo',
            isActive: true,
            width: 1
          },
          {
            text: 'Vehicle No',
            identifier : 'vehicle',
            isActive: true,
            width: 4
          },
          {
            text: 'Transporter Name',
            identifier : 'TransporterName',
            isActive: true,
            width: 4
          },
          {
            text: 'Order Count',
            identifier : 'VendorCount',
            isActive: true,
            width: 3
          },
        ];
        this.activeColumnCount = this.tableColumns.length;
        let vendorCount = 0;
        Object.keys(vehicleData).map((vehicle:any) => {
          vendorCount++;
          vehicleData[vehicle]['serialNo'] = vendorCount;
          vehicleData[vehicle]['VendorCount'] = vehicleData[vehicle].dataArray?.length || 0;
        });
        this.reportData = Object.keys(vehicleData).map((key) => vehicleData[key]);
        this.onChangeColumn();
      });
    }
    else if(report.toLowerCase() == "area wise expenses report"){
      this.shipmentService.getAllShipments().then((shipmentData) => {
        this.vendors = this.shipmentService.vendorsById;
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
            isActive: true,
            width: 1
          },
          {
            text: 'W/S Town',
            identifier : 'WSTown',
            isActive: true,
            width: 3
          },
          {
            text: 'Vendors Count',
            identifier : 'VendorsCount',
            isActive: true,
            width: 5
          },
          {
            text: 'Shipment Count',
            identifier : 'TotalShipmentCount',
            isActive: true,
            width: 3
          },
        ];
        this.activeColumnCount = this.tableColumns.length;
        let vendorCount = 0;
        Object.keys(this.vendors).map((vendor:any) => {
          vendorCount++;
          this.vendors[vendor]['serialNo'] = vendorCount;
          this.vendors[vendor]['shipmentCount'] = this.vendors[vendor].shipments?.length || 0;
        });
        const vendorFinalData = Object.keys(this.vendors).map((key) => this.vendors[key]);
        const areas:any = {};
        vendorFinalData.map((item:any) => {
          if(!item["WSTown"]){
            return;
          }
          if(!areas[item["WSTown"]]){
            areas[item["WSTown"]] = {};
            areas[item["WSTown"]]['vendors'] = [];           
          }
          areas[item["WSTown"]]['vendors'].push(item);
          areas[item["WSTown"]]['WSTown'] = item["WSTown"];
        });
        const areaFinalData = Object.keys(areas).map((key) => areas[key]);
        areaFinalData.map((item:any,index) => {
          item['VendorsCount'] = item.vendors?.length || 0;
          let shipmentCount = 0;
          item.vendors?.map((vendor:any) => {
            shipmentCount+= (+(vendor.shipmentCount));
          });
          item['TotalShipmentCount'] = shipmentCount;
          item['serialNo'] = index+1;
        });
        this.reportData = areaFinalData;
        this.onChangeColumn();
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
