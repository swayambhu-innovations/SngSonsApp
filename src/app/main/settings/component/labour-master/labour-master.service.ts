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
} from '@angular/fire/storage';
import { Config } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class LabourMasterService {
  constructor(private storage: Storage, public firestore: Firestore) { }

  getLabourParty() {
    return getDocs(collection(this.firestore, Config.collection.labourMaster));
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
