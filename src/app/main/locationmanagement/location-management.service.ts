import { Injectable } from "@angular/core";
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
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Config } from "src/app/config";

@Injectable({
  providedIn: "root",
})
export class LocationManagementService {
  constructor(public firestore: Firestore, private router: Router) {}

  addAreas(areaData: any) {
    if (!areaData.id) {
      return setDoc(
        doc(
          this.firestore,
          Config.formSettingVariable.areas,
          areaData.locName.toString()
        ),
        areaData
      );
    } else {
      return updateDoc(
        doc(this.firestore, Config.formSettingVariable.areas, areaData.id),
        areaData
      );
    }
  }

  getAreas() {
    return getDocs(collection(this.firestore, Config.formSettingVariable.areas));
  }

  deleteArea(areaID: string) {
    return deleteDoc(doc(this.firestore, Config.formSettingVariable.areas, areaID));
  }

  updAreaStatus(areaID: string, status: boolean) {
    return updateDoc(doc(this.firestore, Config.formSettingVariable.areas, areaID), {
      active: status,
    });
  }
}