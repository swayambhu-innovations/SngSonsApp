import { Injectable } from '@angular/core';
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
import { Config } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class ReceivingsService {
  constructor(public firestore: Firestore) {}

  vendors: any = {};
  vendorsById: any = {};
  vehicles: any = {};

  getReceivingsByDate(date: string, edate?: string, status?: string[]) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0);
    let endDate = new Date(date);
    if (edate) {
      endDate = new Date(edate);
    }
    endDate.setHours(23, 59, 59);

    if (status) {
      return getDocs(
        query(
          collectionGroup(this.firestore, Config.collection.recievings),
          where('expDeliverDate', '>=', new Date(startDate).getTime()),
          where('expDeliverDate', '<=', new Date(endDate).getTime()),
          where('status', 'in', ['completed', 'suspended'])
        )
      );
    } else {
      return getDocs(
        query(
          collectionGroup(this.firestore, Config.collection.recievings),
          where('expDeliverDate', '>=', new Date(startDate).getTime()),
          where('expDeliverDate', '<=', new Date(endDate).getTime())
        )
      );
    }
  }

  getShipmentsByDateRange(date1: string, date2: string, status?: string[]) {
    const startDate = new Date(date1);
    startDate.setHours(0, 0, 0);
    const endDate = new Date(date2);
    endDate.setHours(23, 59, 59);

    return getDocs(
      query(
        collectionGroup(this.firestore, Config.collection.recievings),
        where('expDeliverDate', '>=', new Date(startDate).getTime()),
        where('expDeliverDate', '<=', new Date(endDate).getTime()),
        where('status', 'in', ['completed', 'suspended'])
      )
    );
  }

  getAllShipments() {
    return getDocs(
      query(collectionGroup(this.firestore, Config.collection.recievings))
    );
  }

  getSuppliers(supplierID: string) {
    return getDocs(
      collection(this.firestore, Config.collection.supplierMaster, supplierID)
    );
  }
}
