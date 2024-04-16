import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Config } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(public firestore: Firestore, private router: Router) {}

  addAreas(areaData: any) {
    if (!areaData.id) {
      return setDoc(
        doc(
          this.firestore,
          Config.collection.areas,
          areaData.locName.toString()
        ),
        areaData
      );
    } else {
      return updateDoc(
        doc(this.firestore, Config.collection.areas, areaData.id),
        areaData
      );
    }
  }

  updateArea(areaID: any, empID: any) {
    return updateDoc(doc(this.firestore, Config.collection.users, empID), {
      areaID: areaID,
    });
  }

  getAreas() {
    return getDocs(collection(this.firestore, Config.collection.areas));
  }

  deleteArea(areaID: string) {
    return deleteDoc(doc(this.firestore, Config.collection.areas, areaID));
  }

  updAreaStatus(areaID: string, status: boolean) {
    return updateDoc(doc(this.firestore, Config.collection.areas, areaID), {
      active: status,
    });
  }
}
