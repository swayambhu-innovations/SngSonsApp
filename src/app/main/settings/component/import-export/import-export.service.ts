import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { isEmpty, groupBy } from 'lodash';
import { Config } from 'src/app/config';
import { ShipmentsService } from 'src/app/main/home/tabs/shipments/shipments.service';
import { ShipmentDetailPage } from 'src/app/main/shipment-detail/shipment-detail.page';
import { ShipmentStatus } from 'src/app/utils/enum';
import { NotificationService } from 'src/app/utils/notification';

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(
    public firestore: Firestore,
    private notification: NotificationService,
    private shipmentService: ShipmentsService
  ) {}
  lastInvInDB: string = '';
  lastShipmentData: any;
  oldShipments: any;

  getShipments() {
    return getDocs(collection(this.firestore, Config.collection.shipments));
  }

  async addShipment(shipmentData: any) {
    if (!shipmentData.id) {
      return await setDoc(
        doc(
          this.firestore,
          Config.collection.shipments,
          shipmentData.ShipmentNumber
        ),
        shipmentData
      );
    } else {
      return updateDoc(
        doc(this.firestore, Config.collection.shipments, shipmentData.id),
        shipmentData
      );
    }
  }

  checkShipment = (shipmentId: string) => {
    return getDocs(
      query(
        collection(this.firestore, Config.collection.shipments),
        where(documentId(), '==', shipmentId)
      )
    );
  };

  deleteShipments(shipmentId: string) {
    return deleteDoc(
      doc(this.firestore, Config.collection.shipments, shipmentId)
    );
  }

  getAllVendors() {
    return getDocs(collection(this.firestore, Config.collection.vendorMaster));
  }

  getAllVehicles() {
    return getDocs(collectionGroup(this.firestore, Config.collection.vehicles));
  }

  addVendor(wsCode: any, vendorData: any) {
    return setDoc(
      doc(this.firestore, Config.collection.vendorMaster, wsCode.toString()),
      vendorData
    );
  }

  addVehicle(vehicleData: any) {
    return setDoc(
      doc(
        this.firestore,
        Config.collection.vehiclesCategory,
        'pending',
        'vehicles',
        vehicleData.registrationNo
      ),
      vehicleData
    );
  }

  formatShipment = async (data: any, formatDate: any) => {
    const shipmentsFromDB: any[] = []; // fetch shipments from DB
    let sameShipments: number[] = []; // store duplicate shipments from ZSD
    let allShipmentsData: any[] = []; // store all shipments
    try {
      // get last custom invoice from DB
      {
        await this.getShipments().then((dataDB) => {
          if (dataDB)
            dataDB.docs.map((item: any) => shipmentsFromDB.push(item.data()));
        });
        if (shipmentsFromDB.length > 0)
          shipmentsFromDB.sort((a: any, b: any) =>
            a?.vendorData[0]['CustomInvoiceNo'] >
            b?.vendorData[0]['CustomInvoiceNo']
              ? 1
              : b?.vendorData[0]['CustomInvoiceNo'] >
                a?.vendorData[0]['CustomInvoiceNo']
              ? -1
              : 0
          );
        this.lastInvInDB =
          shipmentsFromDB[shipmentsFromDB.length - 1]?.vendorData[0][
            'CustomInvoiceNo'
          ];
        this.lastShipmentData =
          shipmentsFromDB[shipmentsFromDB.length - 1]?.vendorData[0][
            'ShipmentCostDate'
          ];
      }

      {
        // sort all shipments got from user
        data = data.filter((item: any) => item['Custom Invoice No'] !== '');
        data.sort((a: any, b: any) =>
          a['Custom Invoice No'] > b['Custom Invoice No']
            ? 1
            : b['Custom Invoice No'] > a['Custom Invoice No']
            ? -1
            : 0
        );
      }

      // remove previous uploaded shipments
      await data.map((shipment: any, index: any) => {
        if (shipment['Custom Invoice No'] == this.lastInvInDB) {
          this.oldShipments = data.slice(0, index + 1);
          data = data.slice(index + 1);
        }

        // if (shipment['Shipment Cost Date'] <= this.lastShipmentData) {
        //   this.oldShipments = data.slice(0, index + 1);
        //   data = data.slice(index + 1);
        // }
      });

      // finding duplicate shipment no (club mode)
      {
        data.forEach((item: any) =>
          sameShipments.push(item['Shipment Number'])
        );
        let duplicate_elements = [];
        for (let element of sameShipments) {
          if (
            sameShipments.indexOf(element) !==
            sameShipments.lastIndexOf(element)
          )
            duplicate_elements.push(element);
        }
        sameShipments = duplicate_elements;
      }

      // storing actual data
      data.map((vendor: any) => {
        let vendorData: any[] = [];
        let shipmentDetails: any;
        if (allShipmentsData.length > 0)
          allShipmentsData.map((item: any) => {
            if (
              item['Shipment Number'] == vendor['Shipment Number'] &&
              item['Lorry No'] == vendor['Lorry No']
            ) {
              shipmentDetails = {
                ShipmentNumber: vendor['Shipment Number'],
                LorryNo: vendor['Lorry No'],
                LRNo: vendor['LR No'],
                TransporterName: vendor['Transporter Name'],
                Serviceagent: vendor['Service agent'],
                Ownership: vendor['Ownership'],
                active: true,
                createdAt: new Date(),
                status: ShipmentStatus.PendingDispatch,
              };
              vendorData = [
                ...item?.vendorData,
                {
                  BillingDate: formatDate(vendor['Billing Date']).getTime(),
                  SoldToParty: vendor['Sold-To Party'],
                  CustomerName: vendor['Customer Name'],
                  BillingDocument: vendor['Billing Document'],
                  CustomInvoiceNo: vendor['Custom Invoice No'],
                  GSTInvoiceNumber: vendor['GST Invoice Number'],
                  KOT: vendor['KOT'],
                  TotalInvoiceAmount: vendor['Total Invoice Amount'],
                  SalesValueMinusShipmentCost:
                    vendor['Sales Value Minus Shipment Cost'],
                  Taxamount: vendor['Tax amount'],
                  ShipmentCost: vendor['Shipment Cost'],
                  ShipmentCostDate: formatDate(
                    vendor['Shipment Cost Date']
                  ).getTime(),
                },
              ];
            } else {
              shipmentDetails = {
                ShipmentNumber: vendor['Shipment Number'],
                LorryNo: vendor['Lorry No'],
                LRNo: vendor['LR No'],
                TransporterName: vendor['Transporter Name'],
                Serviceagent: vendor['Service agent'],
                Ownership: vendor['Ownership'],
                active: true,
                createdAt: new Date(),
                status: ShipmentStatus.PendingDispatch,
              };
              vendorData = [
                {
                  BillingDate: formatDate(vendor['Billing Date']).getTime(),
                  SoldToParty: vendor['Sold-To Party'],
                  CustomerName: vendor['Customer Name'],
                  BillingDocument: vendor['Billing Document'],
                  CustomInvoiceNo: vendor['Custom Invoice No'],
                  GSTInvoiceNumber: vendor['GST Invoice Number'],
                  KOT: vendor['KOT'],
                  TotalInvoiceAmount: vendor['Total Invoice Amount'],
                  SalesValueMinusShipmentCost:
                    vendor['Sales Value Minus Shipment Cost'],
                  Taxamount: vendor['Tax amount'],
                  ShipmentCost: vendor['Shipment Cost'],
                  ShipmentCostDate: formatDate(
                    vendor['Shipment Cost Date']
                  ).getTime(),
                },
              ];
            }
          });
        else {
          shipmentDetails = {
            ShipmentNumber: vendor['Shipment Number'],
            LorryNo: vendor['Lorry No'],
            LRNo: vendor['LR No'],
            TransporterName: vendor['Transporter Name'],
            Serviceagent: vendor['Service agent'],
            Ownership: vendor['Ownership'],
            active: true,
            createdAt: new Date(),
            status: ShipmentStatus.PendingDispatch,
          };
          vendorData = [
            {
              BillingDate: formatDate(vendor['Billing Date']).getTime(),
              SoldToParty: vendor['Sold-To Party'],
              CustomerName: vendor['Customer Name'],
              BillingDocument: vendor['Billing Document'],
              CustomInvoiceNo: vendor['Custom Invoice No'],
              GSTInvoiceNumber: vendor['GST Invoice Number'],
              KOT: vendor['KOT'],
              TotalInvoiceAmount: vendor['Total Invoice Amount'],
              SalesValueMinusShipmentCost:
                vendor['Sales Value Minus Shipment Cost'],
              Taxamount: vendor['Tax amount'],
              ShipmentCost: vendor['Shipment Cost'],
              ShipmentCostDate: formatDate(
                vendor['Shipment Cost Date']
              ).getTime(),
            },
          ];
        }
        allShipmentsData.push({
          ...shipmentDetails,
          vendorData: [...vendorData],
        });
      });
    } catch (e) {
      console.log(e);
      this.notification.showError(Config.messages.zsdInvalid);
      return null;
    }
    return allShipmentsData;
  };

  async getVendor(customerName: string, SoldToParty: string, scope: any) {
    if (isEmpty(customerName)) {
      customerName = '';
    }
    let vendor =
      scope.shipmentService?.vendors[
        customerName.split(' ').join('-').toLowerCase()
      ];
    if (!vendor) {
      const vendorData = {
        WSName: customerName,
        WSCode: SoldToParty,
        postalCode: '',
        WSTown: '',
        panNo: '',
        phoneNO: '',
        GSTNo: '',
        shippingType: '',
        distance: '',
        maxCreditLimit: '',
        vendorProfileImg: '',
        active: true,
        pending: true,
        createdAt: new Date(),
        id: '',
      };
      await scope.importExportService
        .addVendor(SoldToParty, vendorData)
        .then((docRef: any) => {
          vendor = { id: SoldToParty.toString() };
          scope.shipmentService.vendors[
            customerName.split(' ').join('-').toLowerCase()
          ] = { ...vendorData, ...vendor };
        });
    }
    return vendor.id;
  }

  async getVehicle(data: any, scope: any) {
    let lorryNo = data.LorryNo;
    if (isEmpty(lorryNo)) {
      lorryNo = '';
    }
    lorryNo = lorryNo.split(' ').join('');
    let vehicle = scope.shipmentService?.vehicles[lorryNo];
    if (!vehicle) {
      const vehicleData = {
        ownershipType: data.Ownership ? data.Ownership.toLowerCase() : '',
        registrationNo: data.LorryNo,
        active: true,
        createdAt: new Date(),
      };
      await scope.importExportService.addVehicle(vehicleData);
    }
    return lorryNo;
  }

  async addShipments(data: any, scope: any, loader: any, notification: any) {
    loader.present();

    const tdata = groupBy(data, 'ShipmentNumber');
    data.data = [];
    Object.keys(tdata).forEach((key) => {
      data.data.push(
        tdata[key].reduce(
          (acc, item) => {
            acc = {
              ...item,
              vendorData: [...acc.vendorData, ...item.vendorData],
              ShipmentCostDate: item.vendorData[0].ShipmentCostDate,
            };
            return acc;
          },
          { vendorData: [] }
        )
      );
    });

    await Promise.all(
      data.data.map(async (item: any) => {
        const vehicle = await scope.importExportService.getVehicle(item, scope);
        await item.vendorData.map(async (vdata: any, index: number) => {
          const vendor = await scope.importExportService.getVendor(
            vdata.CustomerName,
            vdata.SoldToParty,
            scope
          );
          item.vendorData[index].vendor = vendor;
        });
        if (this.lastInvInDB != '')
          await scope.importExportService
            .checkShipment(item.ShipmentNumber)
            .then(async (resdata: any) => {
              if (resdata.docs && resdata.docs.length > 0) {
                const resData = resdata.docs[0].data();
                resData.vendorData = resData.vendorData.concat(item.vendorData);
                await scope.importExportService.addShipment({
                  ...resData,
                  id: resdata.docs[0].id,
                });
              } else {
                await scope.importExportService.addShipment({
                  ...item,
                  vehicle,
                });
              }
            });
        return { ...item, vehicle };
      })
    )
      .then(() => {
        loader.dismiss();
        notification.showSuccess(Config.messages.zsdSuccess);
      })
      .catch((error) => {
        console.log(error);
        notification.showError(Config.messages.errorOccurred);
        loader.dismiss();
      });
  }
}
