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
  providedIn: "root",
})
export class TodayAttendanceService {
  constructor(public firestore: Firestore) {}

  currentDate = new Date();

  currentYear = this.currentDate.getFullYear().toString();

  currentMonth = this.currentDate.getMonth()?.toString();

  todayDate = this.currentDate.getDate().toString();

  monthsArray: any = [
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

  getUserList(): any {
    return getDocs(collection(this.firestore, Config.collection.users));
  }
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


  // markAttendance(userId: any) {
  //   setDoc(
  //     doc(
  //       this.firestore,
  //       Config.collection.attendance,
  //       this.currentYear,
  //       this.monthsArray[this.currentMonth],
  //       userId.toString()
  //     ),
  //     {
  //       [this.todayDate]: { present: true, offPremises: 0 },
  //     }
  //   );
  // }

  markAttendance(userId: any) {
    const attendanceRef = doc(
      this.firestore,
      Config.formSettingVariable.attendance,
      this.currentYear,
      this.monthsArray[this.currentMonth],
      userId.toString()
    );
  
    getDoc(attendanceRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const attendanceData = docSnapshot.data();
        if (!(this.todayDate in attendanceData)) {
          setDoc(attendanceRef, {
            ...attendanceData,
            [this.todayDate]: { present: true, offPremises: 0 },
          }, { merge: true }); 
        }
      } else {
       
        setDoc(attendanceRef, {
          [this.todayDate]: { present: true, offPremises: 0 },
        });
      }
    });
  }


  async markEmployeeAttendance(userId: any, attendanceData: any) {
    try {
      if (!userId || !attendanceData) {
        throw new Error("Invalid Data");
      }
      setDoc(
        doc(
          this.firestore,
          Config.formSettingVariable.attendance,
          this.currentYear,
          this.monthsArray[this.currentMonth],
          userId.toString()
        ),
        {
          [this.todayDate]: attendanceData,
        }
      );
    } catch (error) {
      console.error("Error updating today attendance my admin:", error);
    }
  }
}
