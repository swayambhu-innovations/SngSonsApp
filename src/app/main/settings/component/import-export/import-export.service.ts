import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  documentId,
  getDoc,
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
import { RecievingStatus, ShipmentStatus } from 'src/app/utils/enum';
import { NotificationService } from 'src/app/utils/notification';

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(
    public firestore: Firestore,
    private notification: NotificationService
  ) {}
  lastInvInDB: string = '';
  lastExpDelDataInDB: any;
  lastShipmentData: any;
  oldShipments: any;

  getShipments() {
    return getDocs(collection(this.firestore, Config.collection.shipments));
  }

  getZSD() {
    return getDocs(
      query(
        collection(this.firestore, Config.collection.zsd),
        where(documentId(), '!=', 'voucher')
      )
    );
  }

  getRecievings() {
    return getDocs(collection(this.firestore, Config.collection.recievings));
  }

  getZMM() {
    return getDocs(
      query(
        collection(this.firestore, Config.collection.zmm),
        where(documentId(), '!=', 'voucher')
      )
    );
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

  async addRecievings(recievingData: any) {
    if (!recievingData.id) {
      return await addDoc(
        collection(this.firestore, Config.collection.recievings),
        recievingData
      );
    } else {
      return updateDoc(
        doc(this.firestore, Config.collection.recievings, recievingData.id),
        recievingData
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

  checkRecieving = (recievingId: string) => {
    return getDocs(
      query(
        collection(this.firestore, Config.collection.recievings),
        where(documentId(), '==', recievingId)
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

  getTransporter(transporterName: string) {
    return getDocs(
      query(
        collection(this.firestore, Config.collection.transporterMaster),
        where('transporterName', '==', transporterName)
      )
    );
  }

  async addTransporter(transporterData: any) {
    const trasnporter = await this.getTransporter(
      transporterData.transporterName
    );
    if (!trasnporter?.docs[0]?.exists()) {
      const data = {
        transporterName: transporterData.transporterName,
        vehicles: [transporterData.vehicleNo],
      };
      await addDoc(
        collection(this.firestore, Config.collection.transporterMaster),
        { ...data, id: '' }
      );
    } else {
      const data = {
        transporterName: trasnporter?.docs[0]?.data()['transporterName'],
        vehicles: [
          ...trasnporter.docs[0].data()['vehicles'],
          transporterData.vehicleNo,
        ],
      };
      await updateDoc(
        doc(
          this.firestore,
          Config.collection.transporterMaster,
          trasnporter.docs[0].id
        ),
        { ...data, id: trasnporter.docs[0].id }
      );
    }
  }

  getSuppplier(supplierID: string) {
    return getDoc(
      doc(this.firestore, Config.collection.supplierMaster, supplierID)
    );
  }

  async addSuppliers(supplierData: any) {
    const supplier = await this.getSuppplier(supplierData.supplierID);
    if (!supplier.exists()) {
      await setDoc(
        doc(
          this.firestore,
          Config.collection.supplierMaster,
          supplierData.supplierID
        ),
        { ...supplierData, active: true, createdAt: new Date(), pending: true }
      );
    } else {
      await updateDoc(
        doc(
          this.firestore,
          Config.collection.supplierMaster,
          supplierData.supplierID
        ),
        { ...supplierData, active: true, createdAt: new Date(), pending: true }
      );
    }
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

  async addFiles(fileDetails: any, isZSD: boolean) {
    if (isZSD)
      await setDoc(
        doc(this.firestore, Config.collection.zsd, fileDetails.fileName),
        fileDetails
      );
    else
      await setDoc(
        doc(this.firestore, Config.collection.zmm, fileDetails.fileName),
        fileDetails
      );
  }

  formatShipment = async (data: any, formatDate: any) => {
    const shipmentsFromDB: any[] = []; // fetch shipments from DB
    let allShipmentsData: any[] = []; // store all shipments
    let c = 0;

    // validating zsd file
    data.map((item: any) => {
      if (item['Custom Invoice No']) c += 1;
    });
    if (c == 0) return false;

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

  formatRecieving = async (data: any, formatDate: any) => {
    let vehicleGroup: any; // store all vehicles by group got from ZMM
    let supplierGroup: any; // store all suppliers by group got from ZMM
    const recievingFromDB: any[] = []; // fetch recievings from DB
    let allVehicles: any[] = [];
    let allSuppliers: any[] = [];
    let allRecievingsData: any[] = []; // store all recievings
    let c = 0;

    // validating zmm file
    data.map((item: any) => {
      if (item['expDeliverDate']) c += 1;
    });
    if (c == 0) return false;
    try {
      // remove empty records
      data = data.filter((recieving: any) => {
        return !(recieving['PRODUCT CODE'] === '');
      });

      // get last exp delivery from DB
      {
        await this.getRecievings().then((dataDB) => {
          if (dataDB)
            dataDB.docs.map((item: any) => recievingFromDB.push(item.data()));
        });

        if (recievingFromDB.length > 0) {
          //store last exp delivery date from DB
          recievingFromDB.sort((a: any, b: any) =>
            a?.['expDeliverDate'] > b?.['expDeliverDate']
              ? 1
              : b?.['expDeliverDate'] > a?.['expDeliverDate']
              ? -1
              : 0
          );
          this.lastExpDelDataInDB =
            recievingFromDB[recievingFromDB.length - 1]['expDeliverDate'];

          //remove rows with existing delivery id in DB
          // recievingFromDB.map((item) => {
          //   item?.products?.map((product: any) => {
          //     data = data.filter((recieving: any) => {
          //       return !(product.deliveryNo != recieving['DELIVERY']);
          //     });
          //   });
          // });
        }
      }

      // remove previous uploaded recievings by exp delivery date in DB
      if (this.lastExpDelDataInDB)
        data = data.filter((recieving: any) => {
          return !(
            formatDate(recieving['EXPT.DELIVERY']).getTime() <=
            this.lastExpDelDataInDB
          );
        });

      // storing all vehicles
      {
        await data.forEach((item: any) => allVehicles.push(item['VEHICLE.NO']));
        allVehicles = [...new Set(allVehicles)];
      }

      // storing all suppliers
      {
        await data.forEach((item: any) =>
          allSuppliers.push(item['SUPP.PLANT'])
        );
        allSuppliers = [...new Set(allSuppliers)];
      }

      //filter products
      {
        let supplierData: any[] = [];
        let productsData: any[] = [];
        let details: any;
        let totalQty: number = 0;

        // grouping according to vehicle no
        allVehicles.map((item: any) => {
          data.map((recieving: any) => {
            if (recieving['VEHICLE.NO'] == item) {
              details = {
                recPlantDesc: recieving['REC.PLANT DESC'],
                dispatchDate: formatDate(recieving['DISPATCH DATE']).getTime(),
                expDeliverDate: formatDate(
                  recieving['EXPT.DELIVERY']
                ).getTime(),
                vehicleNo: recieving['VEHICLE.NO'],
                gateEntryDate: formatDate(
                  recieving['Gate Entry Date']
                ).getTime(),
                gateEntryNo: recieving['Gate Entry Number'],
                transporterName: recieving['TRANS.NAME'],
                storageLocation: recieving['Storage Location'],
                active: true,
                createdAt: new Date(),
                status: RecievingStatus.Pending,
              };

              totalQty += recieving['QTY'];

              productsData = [
                ...productsData,
                {
                  supplierName: recieving['SUPP.PLANT DESC'],
                  mfgLocation: recieving['MFG LOCATION'],
                  supplierID: recieving['SUPP.PLANT'],
                  deliveryNo: recieving['DELIVERY'],
                  productCode: recieving['PRODUCT CODE'],
                  productName: recieving['PRODUCT NAME'],
                  quantiity: recieving['QTY'],
                },
              ];
            }
            vehicleGroup = {
              ...details,
              totalQty: totalQty,
              products: [...productsData],
            };
          });
          allRecievingsData = [...allRecievingsData, vehicleGroup];
          (productsData = []), (totalQty = 0);
        });

        // grouping according to supplier ID
        let lastRecieving: any[] = [];
        allVehicles.map((vehicle: any) => {
          allSuppliers.map((supplierNo: any) => {
            allRecievingsData.map((recieving) => {
              recieving.products.map((item: any) => {
                if (
                  item.supplierID == supplierNo &&
                  vehicle == recieving.vehicleNo
                ) {
                  supplierData = [
                    ...supplierData,
                    {
                      supplierID: item.supplierID,
                      supplierName: item.supplierName,
                      mfgLocation: item.mfgLocation,
                      deliveryNo: item.deliveryNo,
                      vehicleNo: vehicle,
                    },
                  ];
                }

                supplierGroup = {
                  suppliers: [...supplierData],
                };
              });
            });
          });
          const uniqueSuppliers = supplierGroup.suppliers.filter(
            (value: any, index: any) => {
              const _value = JSON.stringify(value);
              return (
                index ===
                supplierGroup.suppliers.findIndex((supplierGroup: any) => {
                  return JSON.stringify(supplierGroup) === _value;
                })
              );
            }
          );
          lastRecieving = [...lastRecieving, uniqueSuppliers];
          supplierData = [];
        });

        //joining data
        allRecievingsData.map((recieving, index) => {
          lastRecieving.map((supplier) => {
            if (recieving.vehicleNo == supplier[0].vehicleNo)
              recieving = { ...recieving, supplierData: [...supplier] };
          });
          allRecievingsData[index] = recieving;
        });
      }
    } catch (e) {
      console.log(e);
      this.notification.showError(Config.messages.zmmInvalid);
      return null;
    }
    return allRecievingsData;
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

  async addShipments(
    data: any,
    fileData: any,
    scope: any,
    loader: any,
    notification: any
  ) {
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
        // storing File metadata
        this.addFiles(fileData, true);
        notification.showSuccess(Config.messages.zsdSuccess);
      })
      .catch((error) => {
        console.log(error);
        notification.showError(Config.messages.errorOccurred);
        loader.dismiss();
      });
  }

  async addRecieving(
    data: any,
    fileData: any,
    scope: any,
    loader: any,
    notification: any
  ) {
    loader.present();

    await Promise.all(
      data.map(async (item: any) => {
        // adding data to transport master
        // await scope.importExportService.addTransporter({
        //   transporterName: item.transporterName,
        //   vehicleNo: item.vehicleNo,
        // });

        // adding data to supplier master
        await item.supplierData.map((supplier: any) => {
          scope.importExportService.addSuppliers(supplier);
        });

        // adding data to recievings
        await scope.importExportService.addRecievings({
          ...item,
        });
        return { ...item };
      })
    )
      .then(() => {
        // storing File metadata
        this.addFiles(fileData, false);
        notification.showSuccess(Config.messages.zmmSuccess);
      })
      .catch((error) => {
        console.log(error);
        notification.showError(Config.messages.errorOccurred);
      });

    loader.dismiss();
  }
}
