import { Injectable } from '@angular/core';
import { Config } from 'src/app/config';
import {
  doc,
  updateDoc,
  Firestore,
  collection,
  getDoc,
  setDoc,

} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class BusinessInfoService {
  constructor(public firestore: Firestore) {}

  async getBusinessInfo() {
    const docRef = doc(
      collection(this.firestore, Config.collection.settings),
      'business-info'
    );

    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot;
      } else {
        console.log('Document does not exist!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error;
    }
  }

  updateBusinessInfo(businessInfo: any) {

    return setDoc(
      doc(this.firestore, Config.collection.settings, 'business-info'),
      businessInfo
    );
  }
}
