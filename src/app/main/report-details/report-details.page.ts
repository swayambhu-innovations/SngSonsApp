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
  finalColumnCount: any;
  
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
    this.finalColumnCount = this.tableColumns.filter((item:any) => item.isActive  && !item.isUrl).length;
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
              data['voucherData'] = shipment.data()['voucherData'];
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
            text: 'Area',
            identifier : 'WSTown',
            isActive: true
          },
          {
            text: 'Postal Code',
            identifier : 'postalCode',
            isActive: true
          },
          {
            text: 'W/S GST',
            identifier : 'GSTNo',
            isActive: true
          },
          {
            text: 'PAN No',
            identifier : 'panNo',
            isActive: true
          },
          {
            text: 'W/S Contact no.',
            identifier : 'phoneNO',
            isActive: true
          },
          {
            text: 'KOT Shipped',
            identifier : 'totalKot',
            isActive: true
          }, 
          {
            text: 'Distance(Km)',
            identifier : 'distance',
            isActive: true
          },  
          {
            text: 'Diesel Expense',
            identifier : 'totalDieselExpenseAmount',
            isActive: true
          },  
          {
            text: 'Khuraki Expense',
            identifier : 'totalKhurakiExpenseAmount',
            isActive: true
          }, 
          {
            text: 'Labour Expense',
            identifier : 'totalLabourExpenseAmount',
            isActive: true
          },   
          {
            text: 'Other Expense',
            identifier : 'totalOtherExpenseAmount',
            isActive: true
          },       
          {
            text: 'Shipment Count',
            identifier : 'shipmentCount',
            isActive: true
          },
          {
            text: 'Total Expense',
            identifier : 'totalExpense',
            isActive: true
          },
          {
            text: 'Total Shipment Cost',
            identifier : 'totalShipmentCost',
            isActive: true
          },
          {
            text: 'Total Invoice Anount',
            identifier : 'totalInvoiceAmount',
            isActive: true
          },
          {
            text: 'Pending Shipments',
            identifier : 'pendingShipmentCount',
            isActive: true
          },
          {
            text: 'Completed Shipments',
            identifier : 'completedShipmentCount',
            isActive: true
          },
          {
            text: 'Discarded Shipments',
            identifier : 'discardedShipmentCount',
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
        this.vendors = this.calculateVoucherExpense( Object.keys(this.vendors).map((key) => this.vendors[key]));
        this.reportData = this.vendors;
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
            isActive: true
          },
          {
            text: 'Vehicle No',
            identifier : 'vehicle',
            isActive: true
          },
          {
            text: 'Transporter Name',
            identifier : 'TransporterName',
            isActive: true
          },
          {
            text: 'Ownership',
            identifier : 'Ownership',
            isActive: true,
          },
          {
            text: 'Order Count',
            identifier : 'VendorCount',
            isActive: true
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
            isActive: true
          },
          {
            text: 'W/S Town',
            identifier : 'WSTown',
            isActive: true
          },
          {
            text: 'Vendors Count',
            identifier : 'VendorsCount',
            isActive: true
          },
          {
            text: 'Shipment Count',
            identifier : 'TotalShipmentCount',
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
    else if(report.toLowerCase() == "shipments wise expenses report"){
      this.shipmentService.getShipmentsByDateRange(this.date1,this.date2).then((shipmentData) => {
        this.shipments =  shipmentData.docs.map((shipment) => {
          return { ...shipment.data(), id: shipment.id };
        });
        let shipmentSerialNo = 0;
        this.shipments.map((shipment:any) => {
          shipmentSerialNo++;
          shipment['serialNo'] = shipmentSerialNo;
          shipment['VendorsCount'] = shipment.vendorData?.length || 0;
          shipment['Url'] = "/main/shipment/"+shipment.id;
        });
        this.tableColumns = [
          {
            text: 'S No',
            identifier : 'serialNo',
            isActive: true
          },
          {
            text: 'Shipment Number',
            identifier : 'ShipmentNumber',
            isActive: true
          },
          {
            text: 'Vehicle',
            identifier : 'vehicle',
            isActive: true
          },
          {
            text: 'Ownership',
            identifier : 'Ownership',
            isActive: true
          },
          {
            text: 'Vendors Count',
            identifier : 'VendorsCount',
            isActive: true
          },
          {
            text: '',
            identifier : 'Url',
            isActive: true,
            isUrl : true
          }
        ];
        this.activeColumnCount = this.tableColumns.length;
        this.reportData = this.shipments;
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

  calculateVoucherExpense(expenseObject:any){
    expenseObject.forEach((vendorData:any) => {
      // Initialize variables for each vendorData
      let totalExpenseAmounts:any = {
          diesel: 0,
          freight: 0,
          khuraki: 0,
          labour: 0,
          other: 0,
          repair: 0,
          toll: 0
      };
      let totalShipmentCost = 0;
      let totalInvoiceAmount = 0;
      let completedShipmentCount = 0;
      let discardedShipmentCount = 0;
      let pendingShipmentCount = 0;
      let totalKot = 0;
  
      // Iterate through each shipment
      vendorData?.shipments?.forEach((shipment:any) => {
          shipment.vendorShipment.forEach((vendorShipmentData:any) => {
              // Sum up each expense type
              Object.keys(totalExpenseAmounts).forEach((key:string) => {
                  totalExpenseAmounts[key] += +vendorShipmentData?.voucherData?.[`${key}ExpenseAmount`] || 0;
              });
              // Sum up shipment cost and invoice amount
              totalShipmentCost += +vendorShipmentData?.ShipmentCost || 0;
              totalInvoiceAmount += +vendorShipmentData?.TotalInvoiceAmount || 0;
              totalKot += +vendorShipmentData?.['KOT'] || 0;
          });
          
          // Increment counts based on shipment status
          const status = shipment?.fullShipment?.status?.toLowerCase();
          if (status === 'completed') completedShipmentCount++;
          else if (status === 'suspended') discardedShipmentCount++;
          else if (status === 'pending-dispatch') pendingShipmentCount++;
      });
  
      // Assign calculated values to vendorData
      vendorData.totalDieselExpenseAmount = totalExpenseAmounts.diesel;
      vendorData.totalFreightExpenseAmount = totalExpenseAmounts.freight;
      vendorData.totalKhurakiExpenseAmount = totalExpenseAmounts.khuraki;
      vendorData.totalLabourExpenseAmount = totalExpenseAmounts.labour;
      vendorData.totalOtherExpenseAmount = totalExpenseAmounts.other;
      vendorData.totalRepairExpenseAmount = totalExpenseAmounts.repair;
      vendorData.totalTollExpenseAmount = totalExpenseAmounts.toll;
      vendorData.totalShipmentCost = totalShipmentCost;
      vendorData.totalInvoiceAmount = totalInvoiceAmount;
      vendorData.completedShipmentCount = completedShipmentCount;
      vendorData.discardedShipmentCount = discardedShipmentCount;
      vendorData.pendingShipmentCount = pendingShipmentCount;
      vendorData.totalKot = totalKot;
      vendorData.totalExpense = Object.values(totalExpenseAmounts).reduce((acc:any, curr:any) => acc + curr, 0);
    });
  
    return expenseObject;
  }
}
