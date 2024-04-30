import { Injectable } from '@angular/core';
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
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Config } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(public firestore: Firestore, private router: Router) {}

  getUsers() {
    return getDocs(
      collection(this.firestore, Config.formSettingVariable.users)
    );
  }

  currentDate = new Date();

  currentYear = this.currentDate.getFullYear().toString();

  currentMonth = this.currentDate.getMonth()?.toString();

  todayDate = this.currentDate.getDate().toString();

  monthsArray: any = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  getAttendance() {
    return getDocs(
      collection(
        this.firestore,
        Config.formSettingVariable.attendance,
        this.currentYear,
        this.monthsArray[this.currentMonth]
      )
    );
  }
  async getAttendanceOnDate(currDate: string) {
    try {
      console.log(`Fetching attendance data for date: ${currDate}`);

      const date = new Date(currDate);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }

      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const monthName = this.monthsArray[monthIndex];


      const attendanceCollectionPath = `${Config.formSettingVariable.attendance}/${year}/${monthName}`;

      const attendanceCollection = collection(
        this.firestore,
        attendanceCollectionPath
      );

      const snapshot = await getDocs(attendanceCollection);

     

      return snapshot;
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      throw error;
    }
  }

  async getOrganizationDetail(orgID: any) {
    let docSnap: any;
    if (orgID) {
      docSnap = await getDoc(
        doc(this.firestore, Config.formSettingVariable.organization, orgID)
      );

      if (docSnap.exists()) {
        const docData = docSnap.data();
        return docData?.['profile'];
      }
    }
  }
}
