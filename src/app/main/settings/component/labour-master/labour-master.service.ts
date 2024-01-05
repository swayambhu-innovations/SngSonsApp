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

  getLabourParty(collectionID: string) {
    return getDocs(collection(this.firestore, collectionID));
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

  addLabourParty(labourPartyId: string, LabourFormData: any) {
    if (labourPartyId !== '')
      return updateDoc(
        doc(
          this.firestore,
          Config.labourMasterVariable.labourMaster,
          labourPartyId
        ),
        LabourFormData
      );
    else
      return addDoc(
        collection(this.firestore, Config.labourMasterVariable.labourMaster),
        LabourFormData
      );
  }

  editLabourParty(labourPartyId: string) {
    return getDoc(
      doc(
        this.firestore,
        Config.labourMasterVariable.labourMaster,
        labourPartyId
      )
    );
  }

  deleteLabourParty(labourPartyId: string) {
    return deleteDoc(
      doc(
        this.firestore,
        Config.labourMasterVariable.labourMaster,
        labourPartyId
      )
    );
  }
}
