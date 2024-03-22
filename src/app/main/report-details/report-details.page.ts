import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import * as moment from 'moment';
import { AccountExpenseService } from '../settings/component/account-expense/account-expense.service';
import { LabourMasterService } from '../settings/component/labour-master/labour-master.service';
import { formatDate } from 'src/app/utils/date-util';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.page.html',
  styleUrls: ['./report-details.page.scss'],
})
export class ReportDetailsPage implements OnInit {
  id: any;
  date1: string = '';
  date2: string = '';
  date1Text: string = '';
  date2Text: string = '';
  tableData: any;
  reportData: any;
  openColVariables: boolean = false;
  tableColumns: any;
  activeColumnCount: number = 0;
  minimumActiveCount: number = 1;
  formatDate = formatDate;

  shipments: any;
  selectedDate: any;
  vendors: any;
  finalColumnCount: any;
  isAsc: boolean = true;
  defaultEvent: any = {
    detail: {
      value: {
        identifier: 'serialNo',
        type: 'numeric',
      },
    },
  };
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private shipmentService: ShipmentsService,
    private accountExpenseService: AccountExpenseService,
    private labourMasterService: LabourMasterService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.date1 = moment(new Date()).subtract(45, 'days').format('YYYY-MM-DD');
    this.date1Text = moment(new Date()).subtract(45, 'days').format('DD MMM');
    this.date2 = moment(new Date()).format('YYYY-MM-DD');
    this.date2Text = moment(new Date()).format('DD MMM');
    this.getReport(this.id);
  }

  onChangeColumn(columnItem?: any) {
    if (columnItem) {
      this.tableColumns.map((item: any) => {
        if (item.identifier == columnItem.identifier) {
          item.isActive = !columnItem.isActive;
        }
      });
    }
    const activeColumnVar = this.tableColumns.filter(
      (item: any) => item.isActive
    );
    this.finalColumnCount = this.tableColumns.filter(
      (item: any) => item.isActive && !item.isUrl
    ).length;
    this.activeColumnCount = activeColumnVar.length;
    this.tableData = {
      activeColumns: activeColumnVar,
      tableData: this.reportData,
    };
  }

  getReport(report: string) {
    if (report.toLowerCase() == 'vendor wise expenses report') {
      this.vendors = structuredClone(this.shipmentService.vendorsById);
      if (Object.keys(this.vendors).length == 0) {
        setTimeout(() => {
          this.getReport('vendor wise expenses report');
        }, 300);
        return;
      }
      this.shipmentService
        .getShipmentsByDateRange(this.date1, this.date2)
        .then((shipmentData) => {
          if (shipmentData?.docs[0]) {
            this.shipments = shipmentData.docs.map((shipment) => {
              return { ...shipment.data(), id: shipment.id };
            });
            this.shipments = shipmentData.docs.map((shipment) => {
              shipment.data()['vendorData'].map((data: any) => {
                if (!data.vendor || !this.vendors[data.vendor]) {
                  return;
                }
                if (!this.vendors[data.vendor]?.['shipments']) {
                  this.vendors[data.vendor]['shipments'] = [];
                  const vendorShipment = [];
                  data['voucherData'] = shipment.data()['voucherData'];
                  vendorShipment.push(data);
                  const shipmentObject = {
                    fullShipment: shipment.data(),
                    vendorShipment: vendorShipment,
                  };
                  this.vendors[data.vendor]['shipments'].push(shipmentObject);
                } else {
                  const shipmentIndex =
                    this.vendors[data.vendor]['shipments'].length;
                  if (
                    this.vendors[data.vendor]['shipments'][shipmentIndex - 1]
                  ) {
                    this.vendors[data.vendor]['shipments'][shipmentIndex - 1][
                      'vendorShipment'
                    ].push(data);
                  } else {
                    const vendorShipment = [];
                    vendorShipment.push(data);
                    const shipmentObject = {
                      fullShipment: shipment.data(),
                      vendorShipment: vendorShipment,
                    };
                    this.vendors[data.vendor]['shipments'].push(shipmentObject);
                  }
                }
              });
              return { ...shipment.data(), id: shipment.id };
            });
            this.tableColumns = [
              {
                text: 'S No',
                identifier: 'serialNo',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'W/S code',
                identifier: 'WSCode',
                isActive: true,
                type: 'text',
              },
              {
                text: 'W/S name',
                identifier: 'WSName',
                isActive: true,
                type: 'text',
              },
              {
                text: 'Area',
                identifier: 'WSTown',
                isActive: true,
                type: 'text',
              },
              {
                text: 'Postal Code',
                identifier: 'postalCode',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'W/S GST',
                identifier: 'GSTNo',
                isActive: true,
                type: 'text',
              },
              {
                text: 'PAN No',
                identifier: 'panNo',
                isActive: true,
                type: 'text',
              },
              {
                text: 'W/S Contact no.',
                identifier: 'phoneNO',
                isActive: true,
                type: 'text',
              },
              {
                text: 'KOT Shipped',
                identifier: 'totalKot',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Distance(Km)',
                identifier: 'distance',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Diesel Expense',
                identifier: 'totalDieselExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Khuraki Expense',
                identifier: 'totalKhurakiExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Labour Expense',
                identifier: 'totalLabourExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Other Expense',
                identifier: 'totalOtherExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Shipment Count',
                identifier: 'shipmentCount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Total Expense',
                identifier: 'totalExpense',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Total Shipment Cost',
                identifier: 'totalShipmentCost',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Total Invoice Anount',
                identifier: 'totalInvoiceAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Pending Shipments',
                identifier: 'pendingShipmentCount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Completed Shipments',
                identifier: 'completedShipmentCount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Discarded Shipments',
                identifier: 'discardedShipmentCount',
                isActive: true,
                type: 'numeric',
              },
            ];
            this.activeColumnCount = this.tableColumns.length;
            let vendorCount = 0;
            Object.keys(this.vendors).map((vendor: any) => {
              vendorCount++;
              this.vendors[vendor]['serialNo'] = vendorCount;
              this.vendors[vendor]['shipmentCount'] =
                this.vendors[vendor].shipments?.length || 0;
            });
            this.vendors = this.calculateVoucherExpense(
              Object.keys(this.vendors).map((key) => this.vendors[key])
            );
            this.reportData = this.vendors;
          }
          this.onChangeColumn();
        });
    } else if (report.toLowerCase() == 'vehicle wise expenses report') {
      this.shipmentService
        .getShipmentsByDateRange(this.date1, this.date2)
        .then((shipmentData) => {
          const vehicleData: any = {};
          this.shipments = shipmentData.docs.map((shipment) => {
            if (!vehicleData[shipment.data()['vehicle']]) {
              vehicleData[shipment.data()['vehicle']] = {
                dataArray: [],
                vehicle: {},
              };
            }
            vehicleData[shipment.data()['vehicle']] = {
              ...vehicleData[shipment.data()['vehicle']],
              ...shipment.data(),
            };
            vehicleData[shipment.data()['vehicle']].dataArray.push({
              ...shipment.data(),
            });
            return { ...shipment.data(), id: shipment.id };
          });
          this.tableColumns = [
            {
              text: 'S No',
              identifier: 'serialNo',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Vehicle No',
              identifier: 'vehicle',
              isActive: true,
              type: 'text',
            },
            {
              text: 'Transporter Name',
              identifier: 'TransporterName',
              isActive: true,
              type: 'text',
            },
            {
              text: 'Ownership',
              identifier: 'Ownership',
              isActive: true,
              type: 'text',
            },
            {
              text: 'Order Count',
              identifier: 'VendorCount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'KOT Shipped',
              identifier: 'totalKot',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Distance(Km)',
              identifier: 'distance',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Diesel Expense',
              identifier: 'totalDieselExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Khuraki Expense',
              identifier: 'totalKhurakiExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Labour Expense',
              identifier: 'totalLabourExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Other Expense',
              identifier: 'totalOtherExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Total Expense',
              identifier: 'totalExpense',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Total Shipment Cost',
              identifier: 'totalShipmentCost',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Total Invoice Anount',
              identifier: 'totalInvoiceAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Pending Shipments',
              identifier: 'pendingShipmentCount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Completed Shipments',
              identifier: 'completedShipmentCount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Discarded Shipments',
              identifier: 'discardedShipmentCount',
              isActive: true,
              type: 'numeric',
            },
          ];
          this.activeColumnCount = this.tableColumns.length;
          let vendorCount = 0;
          Object.keys(vehicleData).map((vehicle: any) => {
            vendorCount++;
            vehicleData[vehicle]['serialNo'] = vendorCount;
            vehicleData[vehicle]['VendorCount'] =
              vehicleData[vehicle].dataArray?.length || 0;
          });
          this.reportData = this.calculateVoucherExpenseVehicleWise(
            Object.keys(vehicleData).map((key) => vehicleData[key])
          );
          this.onChangeColumn();
        });
    } else if (report.toLowerCase() == 'area wise expenses report') {
      this.vendors = structuredClone(this.shipmentService.vendorsById);
      if (Object.keys(this.vendors).length == 0) {
        setTimeout(() => {
          this.getReport('area wise expenses report');
        }, 300);
        return;
      }
      this.shipmentService
        .getShipmentsByDateRange(this.date1, this.date2)
        .then((shipmentData) => {
          this.shipments = shipmentData.docs.map((shipment) => {
            shipment.data()['vendorData'].map((data: any) => {
              if (!data.vendor || !this.vendors[data.vendor]) {
                return;
              }
              if (!this.vendors[data.vendor]?.['shipments']) {
                this.vendors[data.vendor]['shipments'] = [];
                const vendorShipment = [];
                vendorShipment.push(data);
                const shipmentObject = {
                  fullShipment: shipment.data(),
                  vendorShipment: vendorShipment,
                };
                this.vendors[data.vendor]['shipments'].push(shipmentObject);
              } else {
                const shipmentIndex =
                  this.vendors[data.vendor]['shipments'].length;
                if (this.vendors[data.vendor]['shipments'][shipmentIndex - 1]) {
                  this.vendors[data.vendor]['shipments'][shipmentIndex - 1][
                    'vendorShipment'
                  ].push(data);
                } else {
                  const vendorShipment = [];
                  vendorShipment.push(data);
                  const shipmentObject = {
                    fullShipment: shipment.data(),
                    vendorShipment: vendorShipment,
                  };
                  this.vendors[data.vendor]['shipments'].push(shipmentObject);
                }
              }
            });
            return { ...shipment.data(), id: shipment.id };
          });
          this.tableColumns = [
            {
              text: 'S No',
              identifier: 'serialNo',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'W/S Town',
              identifier: 'WSTown',
              isActive: true,
              type: 'text',
            },
            {
              text: 'Vendors Count',
              identifier: 'VendorsCount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Shipment Count',
              identifier: 'TotalShipmentCount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'KOT Shipped',
              identifier: 'totalKot',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Diesel Expense',
              identifier: 'totalDieselExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Khuraki Expense',
              identifier: 'totalKhurakiExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Labour Expense',
              identifier: 'totalLabourExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Other Expense',
              identifier: 'totalOtherExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Total Expense',
              identifier: 'totalExpense',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Total Shipment Cost',
              identifier: 'totalShipmentCost',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Total Invoice Anount',
              identifier: 'totalInvoiceAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Pending Shipments',
              identifier: 'pendingShipmentCount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Completed Shipments',
              identifier: 'completedShipmentCount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Discarded Shipments',
              identifier: 'discardedShipmentCount',
              isActive: true,
              type: 'numeric',
            },
          ];
          this.activeColumnCount = this.tableColumns.length;
          let vendorCount = 0;
          Object.keys(this.vendors).map((vendor: any) => {
            vendorCount++;
            this.vendors[vendor]['serialNo'] = vendorCount;
            this.vendors[vendor]['shipmentCount'] =
              this.vendors[vendor].shipments?.length || 0;
          });
          const vendorFinalData = Object.keys(this.vendors).map(
            (key) => this.vendors[key]
          );
          const areas: any = {};
          vendorFinalData.map((item: any) => {
            if (!item['WSTown']) {
              return;
            }
            if (!areas[item['WSTown']]) {
              areas[item['WSTown']] = {};
              areas[item['WSTown']]['vendors'] = [];
            }
            areas[item['WSTown']]['vendors'].push(item);
            areas[item['WSTown']]['WSTown'] = item['WSTown'];
          });
          const areaFinalData = Object.keys(areas).map((key) => areas[key]);
          areaFinalData.map((item: any, index) => {
            item['VendorsCount'] = item.vendors?.length || 0;
            let shipmentCount = 0;
            item.vendors?.map((vendor: any) => {
              shipmentCount += +vendor.shipmentCount;
            });
            item['TotalShipmentCount'] = shipmentCount;
            item['serialNo'] = index + 1;
          });
          this.reportData = this.calculateVoucherExpenseAreaWise(areaFinalData);
          this.onChangeColumn();
        });
    } else if (report.toLowerCase() == 'shipments wise expenses report') {
      this.vendors = structuredClone(this.shipmentService.vendorsById);
      if (Object.keys(this.vendors).length == 0) {
        setTimeout(() => {
          this.getReport('shipments wise expenses report');
        }, 300);
        return;
      }
      this.shipmentService
        .getShipmentsByDateRange(this.date1, this.date2)
        .then((shipmentData) => {
          this.shipments = shipmentData.docs.map((shipment) => {
            return { ...shipment.data(), id: shipment.id };
          });
          let shipmentSerialNo = 0;
          this.shipments.map((shipment: any) => {
            shipmentSerialNo++;
            let totalExpenseAmounts: any = {
              diesel: 0,
              freight: 0,
              khuraki: 0,
              labour: 0,
              other: 0,
              repair: 0,
              toll: 0,
            };
            Object.keys(totalExpenseAmounts).forEach((key: string) => {
              totalExpenseAmounts[key] =
                +shipment?.voucherData?.[`${key}ExpenseAmount`] || 0;
            });
            shipment['WSCode'] = '';
            shipment['WSName'] = '';
            shipment['postalCode'] = '';
            shipment.vendorData?.map((shipmentVendor: any) => {
              shipmentVendor['vendorFullData'] =
                this.vendors[shipmentVendor.vendor] || '';
              shipmentVendor['vendorFullData']?.WSCode &&
                (shipment['WSCode'] +=
                  ',' + shipmentVendor['vendorFullData'].WSCode);
              shipmentVendor['vendorFullData']?.WSName &&
                (shipment['WSName'] +=
                  ',' + shipmentVendor['vendorFullData'].WSName);
              shipmentVendor['vendorFullData']?.postalCode &&
                (shipment['postalCode'] +=
                  ',' + shipmentVendor['vendorFullData'].postalCode);
            });
            shipment['WSCode'] &&
              (shipment['WSCode'] = shipment['WSCode'].substring(1));
            shipment['WSName'] &&
              (shipment['WSName'] = shipment['WSName'].substring(1));
            shipment['postalCode'] &&
              (shipment['postalCode'] = shipment['postalCode'].substring(1));
            shipment['serialNo'] = shipmentSerialNo;
            shipment['VendorsCount'] = shipment.vendorData?.length || 0;
            shipment['Url'] = '/main/shipment/' + shipment.id;
            shipment['Url'] = '/main/shipment/' + shipment.id;
            shipment['timeStamp'] = shipment.voucherData?.createdAt
              ? moment(shipment.voucherData.createdAt.toDate()).format(
                  'dd MMM YYYY'
                )
              : '';
            shipment['timeStampPostDelivery'] = shipment.postDeliveryData
              ?.createdAt
              ? moment(shipment.postDeliveryData.createdAt.toDate()).format(
                  'dd MMM YYYY'
                )
              : '';
            shipment['remark'] = shipment.voucherData?.remark;
            shipment['postDeliveryFilledBy'] =
              shipment.postDeliveryData?.createdByName;
            shipment.totalDieselExpenseAmount = totalExpenseAmounts.diesel;
            shipment.totalFreightExpenseAmount = totalExpenseAmounts.freight;
            shipment.totalKhurakiExpenseAmount = totalExpenseAmounts.khuraki;
            shipment.totalLabourExpenseAmount = totalExpenseAmounts.labour;
            shipment.totalOtherExpenseAmount = totalExpenseAmounts.other;
            shipment.totalRepairExpenseAmount = totalExpenseAmounts.repair;
            shipment.totalTollExpenseAmount = totalExpenseAmounts.toll;
            shipment.totalExpense = Object.values(totalExpenseAmounts).reduce(
              (acc: any, curr: any) => acc + curr,
              0
            );
          });
          this.tableColumns = [
            {
              text: 'S No',
              identifier: 'serialNo',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Shipment Number',
              identifier: 'ShipmentNumber',
              isActive: true,
              type: 'text',
            },
            {
              text: 'Vehicle',
              identifier: 'vehicle',
              isActive: true,
              type: 'text',
            },
            {
              text: 'Ownership',
              identifier: 'Ownership',
              isActive: true,
              type: 'text',
            },
            {
              text: 'Vendors Count',
              identifier: 'VendorsCount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'W/S code',
              identifier: 'WSCode',
              isActive: true,
              type: 'text',
            },
            {
              text: 'W/S name',
              identifier: 'WSName',
              isActive: true,
              type: 'text',
            },
            {
              text: 'Postal Code',
              identifier: 'postalCode',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Diesel Expense',
              identifier: 'totalDieselExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Khuraki Expense',
              identifier: 'totalKhurakiExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Labour Expense',
              identifier: 'totalLabourExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Toll Expense',
              identifier: 'totalTollExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Other Expense',
              identifier: 'totalOtherExpenseAmount',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Total Expense',
              identifier: 'totalExpense',
              isActive: true,
              type: 'numeric',
            },
            {
              text: 'Remark',
              identifier: 'remark',
              isActive: true,
              type: 'text',
            },
            {
              text: 'Timestamp of voucher generated',
              identifier: 'timeStamp',
              isActive: true,
              type: 'date',
            },
            {
              text: 'Timestamp of Post Deliver',
              identifier: 'timeStampPostDelivery',
              isActive: true,
              type: 'date',
            },
            {
              text: 'Post Delivery Filled By',
              identifier: 'postDeliveryFilledBy',
              isActive: true,
              type: 'text',
            },
            {
              text: 'Current Status',
              identifier: 'status',
              isActive: true,
              type: 'text',
            },
            {
              text: '',
              identifier: 'Url',
              isActive: true,
              isUrl: true,
            },
          ];
          this.activeColumnCount = this.tableColumns.length;
          this.reportData = this.shipments;
          this.onChangeColumn();
        });
    } else if (report.toLowerCase() == 'account wise payment report') {
      this.accountExpenseService.getAccounts().then((accounts) => {
        const accountsData: any = {};
        accounts.docs.map((account) => {
          accountsData[account.id] = { ...account.data(), id: account.id };
        });

        this.shipmentService
          .getShipmentsByDateRange(this.date1, this.date2)
          .then((shipmentData) => {
            this.shipments = shipmentData.docs.map((shipment) => {
              return { ...shipment.data(), id: shipment.id };
            });
            this.tableColumns = [
              {
                text: 'S No',
                identifier: 'serialNo',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Account Number',
                identifier: 'accountName',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Diesel Expense',
                identifier: 'totalDieselExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Khuraki Expense',
                identifier: 'totalKhurakiExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Labour Expense',
                identifier: 'totalLabourExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Other Expense',
                identifier: 'totalOtherExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Toll Expense',
                identifier: 'totalTollExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Repair Expense',
                identifier: 'totalRepairExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Total Expense',
                identifier: 'totalExpense',
                isActive: true,
                type: 'numeric',
              },
            ];
            Object.keys(accountsData).map((key, index) => {
              accountsData[key]['serialNo'] = index + 1;
              accountsData[key]['totalDieselExpenseAmount'] = 0;
              accountsData[key]['totalFreightExpenseAmount'] = 0;
              accountsData[key]['totalKhurakiExpenseAmount'] = 0;
              accountsData[key]['totalLabourExpenseAmount'] = 0;
              accountsData[key]['totalOtherExpenseAmount'] = 0;
              accountsData[key]['totalRepairExpenseAmount'] = 0;
              accountsData[key]['totalTollExpenseAmount'] = 0;
            });

            this.shipments.map((shipment: any) => {
              if (shipment.voucherData) {
                accountsData[shipment.voucherData.dieselExpenseBank][
                  'totalDieselExpenseAmount'
                ] += +shipment.voucherData.dieselExpenseAmount || 0;
                accountsData[shipment.voucherData.freightExpenseBank][
                  'totalFreightExpenseAmount'
                ] += +shipment.voucherData.freightExpenseAmount || 0;
                accountsData[shipment.voucherData.khurakiExpenseBank][
                  'totalKhurakiExpenseAmount'
                ] += +shipment.voucherData.khurakiExpenseAmount || 0;
                accountsData[shipment.voucherData.labourExpenseBank][
                  'totalLabourExpenseAmount'
                ] += +shipment.voucherData.labourExpenseAmount || 0;
                accountsData[shipment.voucherData.otherExpenseBank][
                  'totalOtherExpenseAmount'
                ] += +shipment.voucherData.otherExpenseAmount || 0;
                accountsData[shipment.voucherData.repairExpenseBank][
                  'totalRepairExpenseAmount'
                ] += +shipment.voucherData.repairExpenseAmount || 0;
                accountsData[shipment.voucherData.tollExpenseBank][
                  'totalTollExpenseAmount'
                ] += +shipment.voucherData.tollExpenseAmount || 0;
              }
            });
            Object.keys(accountsData).map((key) => {
              accountsData[key].totalExpense =
                accountsData[key]['totalDieselExpenseAmount'] +
                accountsData[key]['totalFreightExpenseAmount'] +
                accountsData[key]['totalKhurakiExpenseAmount'] +
                accountsData[key]['totalLabourExpenseAmount'] +
                accountsData[key]['totalOtherExpenseAmount'] +
                accountsData[key]['totalRepairExpenseAmount'] +
                accountsData[key]['totalTollExpenseAmount'];
            });
            this.activeColumnCount = this.tableColumns.length;
            this.reportData = Object.keys(accountsData).map(
              (key) => accountsData[key]
            );
            this.onChangeColumn();
          });
      });
    } else if (report.toLowerCase() == 'labour party wise expenses report') {
      this.labourMasterService.getLabourParty().then((labours) => {
        const labourData: any = {};
        labours.docs.map((labour) => {
          labourData[labour.id] = { ...labour.data(), id: labour.id };
        });
        this.shipmentService
          .getShipmentsByDateRange(this.date1, this.date2)
          .then((shipmentData) => {
            this.shipments = shipmentData.docs.map((shipment) => {
              return { ...shipment.data(), id: shipment.id };
            });
            this.tableColumns = [
              {
                text: 'S No',
                identifier: 'serialNo',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'Labour Party Name',
                identifier: 'labourPartyName',
                isActive: true,
                type: 'text',
              },
              {
                text: 'Total Labour Expense',
                identifier: 'totalLabourExpenseAmount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'No. of Shipments',
                identifier: 'shipmentsCount',
                isActive: true,
                type: 'numeric',
              },
              {
                text: 'KOTs Loaded',
                identifier: 'kotLoaded',
                isActive: true,
                type: 'numeric',
              },
            ];
            Object.keys(labourData).map((key, index) => {
              labourData[key]['serialNo'] = index + 1;
              labourData[key]['totalLabourExpenseAmount'] = 0;
              labourData[key]['kotLoaded'] = 0;
              labourData[key]['shipmentsCount'] = 0;
            });

            this.shipments.map((shipment: any) => {
              if (shipment.voucherData) {
                labourData[shipment.voucherData.labour][
                  'totalLabourExpenseAmount'
                ] += +shipment.voucherData.labourExpenseAmount || 0;
                labourData[shipment.voucherData.labour]['shipmentsCount'] += 1;
                shipment.vendorData.map((vendorShipmentData: any) => {
                  labourData[shipment.voucherData.labour]['kotLoaded'] +=
                    parseFloat(vendorShipmentData?.['KOT'].toFixed(2)) || 0;
                });
              }
            });
            this.activeColumnCount = this.tableColumns.length;
            this.reportData = Object.keys(labourData).map(
              (key) => labourData[key]
            );
            this.onChangeColumn();
          });
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
    this.date1 = moment(
      e.target.value ? new Date(e.target.value) : new Date()
    ).format('YYYY-MM-DD');
    this.date1Text = moment(
      e.target.value ? new Date(e.target.value) : new Date()
    ).format('DD MMM');
    if (!moment(this.date1).isSameOrBefore(this.date2)) {
      this.date2 = moment(
        e.target.value ? new Date(e.target.value) : new Date()
      ).format('YYYY-MM-DD');
      this.date2Text = moment(
        e.target.value ? new Date(e.target.value) : new Date()
      ).format('DD MMM');
    }
    this.reportData = [];
    this.getReport(this.id);
  }

  endDate(e: any) {
    this.date2 = moment(
      e.target.value ? new Date(e.target.value) : new Date()
    ).format('YYYY-MM-DD');
    this.date2Text = moment(
      e.target.value ? new Date(e.target.value) : new Date()
    ).format('DD MMM');
    if (!moment(this.date2).isSameOrAfter(this.date1)) {
      this.date1 = moment(
        e.target.value ? new Date(e.target.value) : new Date()
      ).format('YYYY-MM-DD');
      this.date1Text = moment(
        e.target.value ? new Date(e.target.value) : new Date()
      ).format('DD MMM');
    }
    this.reportData = [];
    this.getReport(this.id);
  }

  calculateVoucherExpense(expenseObject: any) {
    expenseObject.forEach((vendorData: any) => {
      // Initialize variables for each vendorData
      let totalExpenseAmounts: any = {
        diesel: 0,
        freight: 0,
        khuraki: 0,
        labour: 0,
        other: 0,
        repair: 0,
        toll: 0,
      };
      let totalShipmentCost = 0;
      let totalInvoiceAmount = 0;
      let completedShipmentCount = 0;
      let discardedShipmentCount = 0;
      let pendingShipmentCount = 0;
      let totalKot = 0;

      // Iterate through each shipment
      vendorData?.shipments?.forEach((shipment: any) => {
        shipment.vendorShipment.forEach((vendorShipmentData: any) => {
          // Sum up each expense type
          Object.keys(totalExpenseAmounts).forEach((key: string) => {
            totalExpenseAmounts[key] +=
              +vendorShipmentData?.voucherData?.[`${key}ExpenseAmount`] || 0;
          });
          // Sum up shipment cost and invoice amount
          totalShipmentCost += +vendorShipmentData?.ShipmentCost || 0;
          totalInvoiceAmount += +vendorShipmentData?.TotalInvoiceAmount || 0;
          totalKot += parseFloat(vendorShipmentData?.['KOT']) || 0;
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
      vendorData.totalKot = totalKot.toFixed(2);
      vendorData.totalExpense = Object.values(totalExpenseAmounts).reduce(
        (acc: any, curr: any) => acc + curr,
        0
      );
    });

    return expenseObject;
  }

  calculateVoucherExpenseVehicleWise(expenseObject: any) {
    expenseObject.forEach((vehicleData: any) => {
      // Initialize variables for each vendorData
      let totalExpenseAmounts: any = {
        diesel: 0,
        freight: 0,
        khuraki: 0,
        labour: 0,
        other: 0,
        repair: 0,
        toll: 0,
      };
      let totalShipmentCost = 0;
      let totalInvoiceAmount = 0;
      let completedShipmentCount = 0;
      let discardedShipmentCount = 0;
      let pendingShipmentCount = 0;
      let totalKot = 0;

      // Iterate through each shipment
      vehicleData?.dataArray?.forEach((shipment: any) => {
        Object.keys(totalExpenseAmounts).forEach((key: string) => {
          totalExpenseAmounts[key] +=
            +shipment?.voucherData?.[`${key}ExpenseAmount`] || 0;
        });
        shipment.vendorData.map((vendor: any) => {
          totalKot += parseFloat(vendor?.['KOT']) || 0;
          totalShipmentCost += parseFloat(vendor?.ShipmentCost) || 0;
          totalInvoiceAmount += parseFloat(vendor?.TotalInvoiceAmount) || 0;
        });

        // Increment counts based on shipment status
        const status = shipment?.status?.toLowerCase();
        if (status === 'completed') completedShipmentCount++;
        else if (status === 'suspended') discardedShipmentCount++;
        else if (status === 'pending-dispatch') pendingShipmentCount++;
      });

      // Assign calculated values to vendorData
      vehicleData.totalDieselExpenseAmount = totalExpenseAmounts.diesel;
      vehicleData.totalFreightExpenseAmount = totalExpenseAmounts.freight;
      vehicleData.totalKhurakiExpenseAmount = totalExpenseAmounts.khuraki;
      vehicleData.totalLabourExpenseAmount = totalExpenseAmounts.labour;
      vehicleData.totalOtherExpenseAmount = totalExpenseAmounts.other;
      vehicleData.totalRepairExpenseAmount = totalExpenseAmounts.repair;
      vehicleData.totalTollExpenseAmount = totalExpenseAmounts.toll;
      vehicleData.totalShipmentCost = totalShipmentCost.toFixed(2);
      vehicleData.totalInvoiceAmount = totalInvoiceAmount.toFixed(2);
      vehicleData.completedShipmentCount = completedShipmentCount;
      vehicleData.discardedShipmentCount = discardedShipmentCount;
      vehicleData.pendingShipmentCount = pendingShipmentCount;
      vehicleData.totalKot = totalKot.toFixed(2);
      vehicleData.totalExpense = Object.values(totalExpenseAmounts).reduce(
        (acc: any, curr: any) => acc + curr,
        0
      );
    });

    return expenseObject;
  }

  calculateVoucherExpenseAreaWise(areaObject: any) {
    areaObject.map((expenseObject: any) => {
      expenseObject.totalDieselExpenseAmount = 0;
      expenseObject.totalFreightExpenseAmount = 0;
      expenseObject.totalKhurakiExpenseAmount = 0;
      expenseObject.totalLabourExpenseAmount = 0;
      expenseObject.totalOtherExpenseAmount = 0;
      expenseObject.totalRepairExpenseAmount = 0;
      expenseObject.totalTollExpenseAmount = 0;
      expenseObject.totalShipmentCost = 0;
      expenseObject.totalInvoiceAmount = 0;
      expenseObject.completedShipmentCount = 0;
      expenseObject.discardedShipmentCount = 0;
      expenseObject.pendingShipmentCount = 0;
      expenseObject.totalKot = 0;
      expenseObject.totalExpense = 0;
      let totalExpenseAmounts: any = {
        diesel: 0,
        freight: 0,
        khuraki: 0,
        labour: 0,
        other: 0,
        repair: 0,
        toll: 0,
      };
      let totalShipmentCost = 0;
      let totalInvoiceAmount = 0;
      let completedShipmentCount = 0;
      let discardedShipmentCount = 0;
      let pendingShipmentCount = 0;
      let totalKot = 0;
      expenseObject.vendors?.forEach((vendorData: any) => {
        // Initialize variables for each vendorData

        // Iterate through each shipment
        vendorData?.shipments?.forEach((shipment: any) => {
          const vendorShipmentData = shipment.fullShipment;
          // Sum up each expense type
          Object.keys(totalExpenseAmounts).forEach((key: string) => {
            totalExpenseAmounts[key] +=
              +vendorShipmentData?.voucherData?.[`${key}ExpenseAmount`] || 0;
          });
          // Sum up shipment cost and invoice amount

          // Increment counts based on shipment status

          shipment.vendorShipment.map((vendorShipmentActual: any) => {
            totalShipmentCost +=
              parseFloat(vendorShipmentActual?.ShipmentCost) || 0;
            totalInvoiceAmount +=
              parseFloat(vendorShipmentActual?.TotalInvoiceAmount) || 0;
            totalKot += parseFloat(vendorShipmentActual?.['KOT']) || 0;
          });

          const status = shipment?.fullShipment?.status?.toLowerCase();
          if (status === 'completed') completedShipmentCount++;
          else if (status === 'suspended') discardedShipmentCount++;
          else if (status === 'pending-dispatch') pendingShipmentCount++;
        });
        // Assign calculated values to vendorData
        expenseObject.totalDieselExpenseAmount += totalExpenseAmounts.diesel;
        expenseObject.totalFreightExpenseAmount += totalExpenseAmounts.freight;
        expenseObject.totalKhurakiExpenseAmount += totalExpenseAmounts.khuraki;
        expenseObject.totalLabourExpenseAmount += totalExpenseAmounts.labour;
        expenseObject.totalOtherExpenseAmount += totalExpenseAmounts.other;
        expenseObject.totalRepairExpenseAmount += totalExpenseAmounts.repair;
        expenseObject.totalTollExpenseAmount += totalExpenseAmounts.toll;
        expenseObject.totalShipmentCost += totalShipmentCost;
        expenseObject.totalInvoiceAmount += totalInvoiceAmount;
        expenseObject.completedShipmentCount += completedShipmentCount;
        expenseObject.discardedShipmentCount += discardedShipmentCount;
        expenseObject.pendingShipmentCount += pendingShipmentCount;
        expenseObject.totalKot += +totalKot;
        expenseObject.totalExpense += Object.values(totalExpenseAmounts).reduce(
          (acc: any, curr: any) => acc + curr,
          0
        );
      });
      expenseObject.totalShipmentCost =
        expenseObject.totalShipmentCost.toFixed(2);
      expenseObject.totalInvoiceAmount =
        expenseObject.totalInvoiceAmount.toFixed(2);
      expenseObject.totalKot = expenseObject.totalKot.toFixed(2);
    });
    return areaObject;
  }

  onSortByChange(event: any) {
    this.defaultEvent = event;
    const sortType = event.detail.value.type || false;
    this.reportData.sort((a: any, b: any) => {
      if (this.isAsc) {
        if (sortType == 'numeric') {
          return (
            a[event.detail.value.identifier] - b[event.detail.value.identifier]
          );
        } else if (sortType == 'text') {
          let x = a[event.detail.value.identifier].toLowerCase();
          let y = b[event.detail.value.identifier].toLowerCase();
          if (x > y) {
            return 1;
          }
          if (x < y) {
            return -1;
          }
          return 0;
        } else {
          return 0;
        }
      } else {
        if (sortType == 'numeric') {
          return (
            b[event.detail.value.identifier] - a[event.detail.value.identifier]
          );
        } else if (sortType == 'text') {
          let x = b[event.detail.value.identifier].toLowerCase();
          let y = a[event.detail.value.identifier].toLowerCase();
          if (x > y) {
            return 1;
          }
          if (x < y) {
            return -1;
          }
          return 0;
        } else {
          return 0;
        }
      }
    });
  }

  changeSorting() {
    this.isAsc = !this.isAsc;
    this.onSortByChange(this.defaultEvent);
  }
}
