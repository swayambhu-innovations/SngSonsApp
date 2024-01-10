import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
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
export class LabourMasterService {
  constructor(private storage: Storage, public firestore: Firestore) {}

  getLabourParty() {
    return getDocs(collection(this.firestore, Config.collection.labourMaster));
  }

  async uploadFile(file: any, path?: string) {
    path = path
      ? path + '/' + file.name
      : Config.storage.labourParty + '/' + file.name;
    await uploadBytesResumable(ref(this.storage, path), file);
    return getDownloadURL(ref(this.storage, path));
  }

  deleteFile(file: any, path?: string) {
    path = path
      ? path + '/' + file.name
      : Config.storage.labourParty + '/' + file.name;
    return deleteObject(ref(this.storage, path));
  }

  updLabourType(labourPartyId: string, status: boolean) {
    return updateDoc(
      doc(this.firestore, Config.collection.labourMaster, labourPartyId),
      { active: status }
    );
  }

  addLabourParty(labourData: any) {
    if (!labourData.id) {
      return addDoc(
        collection(this.firestore, Config.collection.labourMaster),
        labourData
      );
    } else {
      return updateDoc(
        doc(this.firestore, Config.collection.labourMaster, labourData.id),
        labourData
      );
    }
  }

  deleteLabourParty(labourPartyId: string) {
    return deleteDoc(
      doc(this.firestore, Config.collection.labourMaster, labourPartyId)
    );
  }
}
