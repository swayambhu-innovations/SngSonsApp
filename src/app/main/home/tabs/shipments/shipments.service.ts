import { Injectable } from "@angular/core";
import {
    Firestore,
    Timestamp,
    addDoc,
    collection,
    collectionGroup,
    deleteDoc,
    doc,
    documentId,
    getDoc,
    getDocs,
    increment,
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

    vendors: any = {};
    vehicles: any = {};

    getShipmentsByDate(date: string) {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59);
        return getDocs(query(collectionGroup(this.firestore, Config.collection.shipments), where('BillingDate', '>=', Timestamp.fromDate(startDate)), where('BillingDate', '<=', Timestamp.fromDate(endDate))));
    }

    getShipmentsById(shipmentId: string) {
        return getDocs(query(collection(this.firestore, Config.collection.shipments), where(documentId(), '==', shipmentId)));
    }

    getVendor(vendorId: string[]) {
        return getDocs(query(collection(this.firestore, Config.collection.vendorMaster), where(documentId(), 'in', vendorId)));
    }

    getVehicle(vehicleId: string) {
        return getDocs(query(collectionGroup(this.firestore, Config.collection.vehicles), where("registrationNo", '==', vehicleId)));
    }

    updShipmentStatus(shipmentId: string, status: string) {
        updateDoc(doc(this.firestore, Config.collection.shipments, shipmentId), { status });
    }

    async updVoucherNumber() {
        await updateDoc(doc(this.firestore, Config.collection.zsd,'voucher'), { id: increment(1) });
        const data: any = await this.getVoucherNumber()
        return data.id;
    }

    async getVoucherNumber() {
        const data = await getDoc(doc(this.firestore, Config.collection.zsd,'voucher'));
        return data.data();
    }

    async updVoucherNumberInShipment(shipmentId: string, voucher: string) {
        await updateDoc(doc(this.firestore, Config.collection.shipments, shipmentId), { voucher });
    }

    async updShipmentVoucher(shipmentId: string, voucherData: any) {
        await updateDoc(doc(this.firestore, Config.collection.shipments, shipmentId), { voucherData });
    }

}
