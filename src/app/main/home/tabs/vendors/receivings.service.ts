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
          where('lastmodified', '>=', new Date(startDate).getTime()),
          where('lastmodified', '<=', new Date(endDate).getTime()),
          where('status', 'in', ['completed', 'suspended'])
        )
      );
    } else {
      return getDocs(
        query(
          collectionGroup(this.firestore, Config.collection.recievings),
          where('lastmodified', '>=', new Date(startDate).getTime()),
          where('lastmodified', '<=', new Date(endDate).getTime())
        )
      );
    }
  }

  getRecievingsByDateRange(date1: string, date2: string, status?: string[]) {
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

  getAllRecievings() {
    return getDocs(
      query(collectionGroup(this.firestore, Config.collection.recievings))
    );
  }

  getRecievingsById(recievingID: string) {
    return getDocs(
      query(
        collection(this.firestore, Config.collection.recievings),
        where(documentId(), '==', recievingID)
      )
    );
  }

  getSuppliers(supplierID: string) {
    return getDoc(
      doc(this.firestore, Config.collection.supplierMaster, supplierID)
    );
  }

  updRecievingStatus(recievingID: string, status: string) {
    updateDoc(doc(this.firestore, Config.collection.recievings, recievingID), {
      status,
    });
  }

  async updVoucherNumber() {
    await updateDoc(doc(this.firestore, Config.collection.zmm, 'voucher'), {
      id: increment(1),
    });
    const data: any = await this.getVoucherNumber();
    return data.id;
  }

  async getVoucherNumber() {
    const data = await getDoc(
      doc(this.firestore, Config.collection.zmm, 'voucher')
    );
    return data.data();
  }

  async updVoucherNumberInRecieving(recievingID: string, voucher: string) {
    await updateDoc(
      doc(this.firestore, Config.collection.recievings, recievingID),
      { voucher }
    );
  }

  async updRecievingVoucher(recievingID: string, data: any) {
    await updateDoc(
      doc(this.firestore, Config.collection.recievings, recievingID),
      { ...data }
    );
  }

  async addAccountExpense(
    accountId: string,
    expenseId: string,
    data: any,
    collectionId: string
  ) {
    console.log(
      Config.collection.accountZMM,
      accountId,
      collectionId,
      expenseId)
    await setDoc(
      doc(
        this.firestore,
        Config.collection.accountZMM,
        accountId,
        'expense',
        'expense',
        collectionId,
        expenseId
      ),
      data
    );
  }
}
