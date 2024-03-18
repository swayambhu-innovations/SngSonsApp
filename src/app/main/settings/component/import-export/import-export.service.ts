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
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { isEmpty, groupBy } from 'lodash';
import { Config } from 'src/app/config';
import { ShipmentStatus } from 'src/app/utils/enum';
import { NotificationService } from 'src/app/utils/notification';

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(
    public firestore: Firestore,
    private notification: NotificationService
  ) {}

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

  addVendor(vendorData: any) {
    return addDoc(
      collection(this.firestore, Config.collection.vendorMaster),
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

  async getLastShipmentId() {
    return getDocs(
      query(
        collection(this.firestore, Config.collection.zsd),
        where(documentId(), '==', 'lastShipmentId')
      )
    );
  }

  async setLastShipmentId(shipmentId: string) {
    return updateDoc(
      doc(this.firestore, Config.collection.zsd, 'lastShipmentId'),
      { id: shipmentId }
    );
  }

  formatShipment = (data: any, formatDate: any) => {
    const customInvoiceNumbers: number[] = [];
    try {
      data = data
        .map((vendor: any) => {
          if (
            vendor['Shipment Number'] != '' &&
            !isNaN(Number(vendor['Shipment Number']))
          ) {
            const invNo = vendor['Custom Invoice No'];
            customInvoiceNumbers.push(
              this.getLast5Digit(invNo.substr(invNo.length - 5))
            );
          }
          return {
            vendorData: [
              {
                BillingDate: formatDate(vendor['Billing Date']),
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
                ShipmentCostDate: formatDate(vendor['Shipment Cost Date']),
              },
            ],
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
        })
        .filter(
          (item: any) =>
            item.ShipmentNumber != '' && !isNaN(Number(item.ShipmentNumber))
        );
    } catch (e) {
      this.notification.showError(Config.messages.zsdInvalid);
      return null;
    }
    return { data, shipments: customInvoiceNumbers };
  };

  async getVendor(customerName: string, scope: any) {
    if (isEmpty(customerName)) {
      customerName = '';
    }
    let vendor =
      scope.shipmentService.vendors[
        customerName.split(' ').join('-').toLowerCase()
      ];
    if (!vendor) {
      const vendorData = {
        WSName: customerName,
        WSCode: '',
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
        .addVendor(vendorData)
        .then((docRef: any) => {
          vendor = { id: docRef.id };
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
    let vehicle = scope.shipmentService.vehicles[lorryNo];
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

  getLast5Digit(id: string) {
    return Number(id.toString().substr(id.length - 5));
  }

  async addShipments(data: any, scope: any, loader: any, notification: any) {
    loader.present();
    let lastShipmentId = (await this.getLastShipmentId()).docs.map(
      (item: any) => {
        return item.data();
      }
    )[0].id;
    lastShipmentId = this.getLast5Digit(lastShipmentId);
    const shipments = data.shipments.sort((a: number, b: number) => a - b);
    if (!shipments.length || shipments[0] <= lastShipmentId) {
      this.notification.showError(Config.messages.zsdInvalidInvoiceNo);
      return;
    }
    const tdata = groupBy(data.data, 'ShipmentNumber');
    data.data = [];
    data.shipments = shipments;
    Object.keys(tdata).forEach((key) => {
      data.data.push(
        tdata[key].reduce(
          (acc, item) => {
            acc = {
              ...item,
              vendorData: [...acc.vendorData, ...item.vendorData],
              BillingDate: item.vendorData[0].BillingDate,
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
            scope
          );
          item.vendorData[index].vendor = vendor;
        });
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
              await scope.importExportService.addShipment({ ...item, vehicle });
            }
          });
        await scope.importExportService.setLastShipmentId(
          data.shipments[data.shipments.length - 1]
        );
        return { ...item, vehicle };
      })
    )
      .catch((error) => {
        console.log(error);
        notification.showError(Config.messages.errorOccurred);
        loader.dismiss();
      })
      .finally(() => {
        loader.dismiss();
        notification.showSuccess(Config.messages.zsdSuccess);
      });
  }
}
