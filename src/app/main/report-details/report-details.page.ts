import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import * as moment from 'moment';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.page.html',
  styleUrls: ['./report-details.page.scss'],
})
export class ReportDetailsPage implements OnInit {
  id: any;
  date1: string = "";
  date2: string = "";
  date1Text: string = "";
  date2Text: string = "";
  tableData: any;
  reportData: any;
  openColVariables: boolean = false;
  tableColumns: any;
  activeColumnCount: number = 0;
  minimumActiveCount: number = 1;

  shipments: any;
  selectedDate: any;
  vendors: any;
  constructor(
    private navCtrl: NavController, 
    private route: ActivatedRoute,
    private shipmentService: ShipmentsService,
  ) {
    
  }

  ngOnInit() {
    
  }
  
  ionViewWillEnter(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.date1 = moment(new Date()).subtract(15,"days").format("YYYY-MM-DD");
    this.date1Text = moment(new Date()).subtract(15,"days").format("DD/MM/YY");
    this.date2 = moment(new Date()).format("YYYY-MM-DD");
    this.date2Text = moment(new Date()).format("DD/MM/YY");
    this.getReport(this.id);
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
      this.shipmentService.getShipmentsByDateRange(this.date1,this.date2).then((shipmentData) => {
        this.vendors = structuredClone(this.shipmentService.vendorsById);
        this.shipments =  shipmentData.docs.map((shipment) => {
          return { ...shipment.data(), id: shipment.id };
        });
        this.shipments =  shipmentData.docs.map((shipment) => {
          shipment.data()['vendorData'].map((data:any) => {
            if(!data.vendor || !this.vendors[data.vendor]){
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
      
      this.shipmentService.getShipmentsByDateRange(this.date1,this.date2).then((shipmentData) => {
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
      this.shipmentService.getShipmentsByDateRange(this.date1,this.date2).then((shipmentData) => {
        this.vendors = structuredClone(this.shipmentService.vendorsById);
        this.shipments =  shipmentData.docs.map((shipment) => {
          shipment.data()['vendorData'].map((data:any) => {
            if(!data.vendor || !this.vendors[data.vendor]){
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
    this.date1 = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    this.date1Text = moment(new Date(e.target.value)).format("DD/MM/YY");
    if(!moment(this.date1).isSameOrBefore(this.date2)){
      this.date2 = moment(new Date(e.target.value)).format("YYYY-MM-DD");
      this.date2Text = moment(new Date(e.target.value)).format("DD/MM/YY");
    }
    this.getReport(this.id);
  }

  endDate(e: any) {
    this.date2 = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    this.date2Text = moment(new Date(e.target.value)).format("DD/MM/YY");
    if(!moment(this.date2).isSameOrAfter(this.date1)){
      this.date1 = moment(new Date(e.target.value)).format("YYYY-MM-DD");
      this.date1Text = moment(new Date(e.target.value)).format("DD/MM/YY");
    }
    this.getReport(this.id);
  }
}
