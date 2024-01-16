import { Injectable } from "@angular/core";
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
import { isEmpty } from "lodash";
import { Config } from "src/app/config";
import { ShipmentStatus } from "src/app/utils/enum";

@Injectable({
    providedIn: 'root',
})

export class ShipmentsService {
    constructor(
        public firestore: Firestore
    ) { }

    getShipments() {
        return getDocs(collection(this.firestore, Config.collection.shipments));
    }

    async addShipment(shipmentData: any) {
        if (!shipmentData.id) {
            return await setDoc(doc(this.firestore, Config.collection.shipments, shipmentData.ShipmentNumber), shipmentData);
        } else {
            return updateDoc(doc(this.firestore, Config.collection.shipments, shipmentData.id), shipmentData);
        }
    }

    async checkShipment(shipmentId: string) {
        return getDocs(query(collection(this.firestore, Config.collection.shipments), where(documentId(), '==', shipmentId)));
    }

    deleteShipments(shipmentId: string) {
        return deleteDoc(doc(this.firestore, Config.collection.shipments, shipmentId));
    }

    getAllVendors() {
        return getDocs(collection(this.firestore, Config.collection.vendorMaster));
    }

    getAllVehicles() {
        return getDocs(collectionGroup(this.firestore, Config.collection.vehicles));
    }

    addVendor(vendorData: any) {
        return addDoc(
            collection(this.firestore, Config.collection.vendorMaster), vendorData
        );
    }

    addVehicle(vehicleData: any) {
        return setDoc(
            doc(this.firestore, Config.collection.vehiclesCategory, 'pending', 'vehicles', vehicleData.registrationNo), vehicleData
        );
    }

    formatShipment = (data: any, formatDate: any) => {
        return data.map((vendor: any) => {
            return {
                BillingDate: formatDate(vendor['Billing Date']),
                SoldToParty: vendor['Sold-To Party'],
                CustomerName: vendor['Customer Name'],
                BillingDocument: vendor['Billing Document'],
                CustomInvoiceNo: vendor['Custom Invoice No'],
                GSTInvoiceNumber: vendor['GST Invoice Number'],
                KOT: vendor['KOT'],
                TotalInvoiceAmount: vendor['Total Invoice Amount'],
                SalesValueMinusShipmentCost: vendor['Sales Value Minus Shipment Cost'],
                ShipmentNumber: vendor['Shipment Number'],
                LorryNo: vendor['Lorry No'],
                LRNo: vendor['LR No'],
                Taxamount: vendor['Tax amount'],
                ShipmentCost: vendor['Shipment Cost'],
                ShipmentCostDate: formatDate(vendor['Shipment Cost Date']),
                TransporterName: vendor['Transporter Name'],
                Serviceagent: vendor['Service agent'],
                Ownership: vendor['Ownership'],
                active: true,
                createdAt: new Date(),
                id: '',
                status: ShipmentStatus.PendingDispatch,
            }
        }).filter((item: any) => item.ShipmentNumber != '' && !isNaN(Number(item.ShipmentNumber)));
    }

    async getVendor(customerName: string, scope: any) {
        if (isEmpty(customerName)) {
            customerName = '';
        }
        let vendor = scope.vendors[customerName.split(' ').join('-').toLowerCase()];
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
            }
            await scope.shipmentsService.addVendor(vendorData).then((docRef: any) => {
                vendor = { id: docRef.id }
            })
        }
        return vendor.id;
    }

    async getVehicle(data: any, scope: any) {
        let lorryNo = data.LorryNo;
        if (isEmpty(lorryNo)) {
            lorryNo = '';
        }
        lorryNo = lorryNo.split(' ').join('');
        let vehicle = scope.vehicles[lorryNo];
        if (!vehicle) {
            const vehicleData = {
                ownershipType: data.Ownership ? data.Ownership.toLowerCase() : '',
                registrationNo: data.LorryNo,
                active: true,
                createdAt: new Date(),
            }
            await scope.shipmentsService.addVehicle(vehicleData);
        }
        return lorryNo;
    }

    async addShipments(data: any, scope: any, loader: any, notification: any) {
        loader.present();
        data = await Promise.all(data.map(async (item: any) => {
            const vendor = await scope.shipmentsService.getVendor(item.CustomerName, scope);
            const vehicle = await scope.shipmentsService.getVehicle(item, scope);
            await scope.shipmentsService.checkShipment(item.ShipmentNumber).then(async (resdata: any) => {
                if (resdata.docs && resdata.docs.length > 0) {
                    
                } else {
                    await scope.shipmentsService.addShipment({ ...item, vendor, vehicle });
                }
            });
            return { ...item, vendor, vehicle }
        })).catch((error) => {
            notification.showError(Config.messages.errorOccurred);
            loader.dismiss();
        }).finally(() => {
            loader.dismiss();
            notification.showSuccess(Config.messages.zsdSuccess);
        });
    }
}
