import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Config } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class VendorMasterService {
  constructor(private storage: Storage, public firestore: Firestore) {}

  getVendors() {
    return getDocs(collection(this.firestore, Config.collection.vendorMaster));
  }

  async uploadFile(file: any, path?: string) {
    path = path
      ? path + '/' + file.name
      : Config.storage.vendors + '/' + file.name;
    await uploadBytesResumable(ref(this.storage, path), file);
    return getDownloadURL(ref(this.storage, path));
  }

  deleteFile(file: any, path?: string) {
    path = path
      ? path + '/' + file.name
      : Config.storage.vendors + '/' + file.name;
    return deleteObject(ref(this.storage, path));
  }

  updVendorType(vendorId: string, status: boolean) {
    return updateDoc(
      doc(this.firestore, Config.collection.vendorMaster, vendorId),
      { active: status }
    );
  }

  addVendor(vendorData: any) {
    if (!vendorData.id) {
      return addDoc(
        collection(this.firestore, Config.collection.vendorMaster),
        vendorData
      );
    } else {
      return updateDoc(
        doc(this.firestore, Config.collection.vendorMaster, vendorData.id),
        vendorData
      );
    }
  }

  deleteVendor(vendorId: string) {
    return deleteDoc(
      doc(this.firestore, Config.collection.vendorMaster, vendorId)
    );
  }
}
