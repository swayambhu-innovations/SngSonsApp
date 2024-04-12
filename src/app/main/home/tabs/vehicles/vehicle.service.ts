import { Injectable } from "@angular/core";
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Config } from "src/app/config";


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(public firestore: Firestore, private router: Router) { }

  getUsers() {
    return getDocs(collection(this.firestore, Config.formSettingVariable.users));
  }

  currentDate = new Date();

  currentYear = this.currentDate.getFullYear().toString();

  currentMonth = this.currentDate.getMonth()?.toString();

  todayDate = this.currentDate.getDate().toString();

  getAttendance() {
    const monthsArray: any = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    return getDocs(
      collection(
        this.firestore,
        Config.formSettingVariable.attendance,
        this.currentYear,
        monthsArray[this.currentMonth]
      )
    );
  }
  async getOrganizationDetail(orgID: any) {
    const docSnap = await getDoc(
      doc(this.firestore, Config.formSettingVariable.organization, orgID)
    );

    if (docSnap.exists()) {
      const docData = docSnap.data();
      return docData?.["profile"];
    }
  }
}
