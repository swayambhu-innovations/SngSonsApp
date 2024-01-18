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

    getVendor(vendorId: string) {
        return getDocs(query(collection(this.firestore, Config.collection.vendorMaster), where(documentId(), '==', vendorId)));
    }

    getVehicle(vehicleId: string) {
        return getDocs(query(collectionGroup(this.firestore, Config.collection.vehicles), where("registrationNo", '==', vehicleId)));
    }

    updShipmentStatus(shipmentId: string, status: string) {
        updateDoc(doc(this.firestore, Config.collection.shipments, shipmentId), { status });
    }

}
