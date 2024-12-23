import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Observable, Subject } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
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
export class TodayAttendanceService {
  constructor(public firestore: Firestore, private platform: Platform) {}
  currentLocation: Subject<Position> = new Subject<Position>();

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

  async deleteAttendance(userId:any){
    await getDocs(collection(this.firestore,'attendance')).then((years:any)=>{
      years.docs.map( async (year:any)=>{
        this.monthsArray.map(async (month:any)=>{
             deleteDoc(doc(this.firestore,'attendance',year.id,month,userId)); 
          })  
      })
    })
  }
  
  getAttendanceStatus(id: string): Observable<string> {
    const ref = doc(
      this.firestore,
      'attendance', 
      this.currentYear,
      this.monthsArray[this.currentMonth],
      id
    );

    return new Observable((observer) => {
      onSnapshot(ref, (docSnapshot) => {
        let status = 'Attendance Pending';
        if (docSnapshot.exists()) {
          const attendance = docSnapshot.data();
          Object.entries(attendance).forEach(([date, data]) => {
            if (date === this.todayDate) {
              if (data.present) {
                status = 'Attendance Present';
              } else {
                status = 'Attendance Absent';
              }
            }
          });
        }
        observer.next(status);
      });
    });
  }

  async initLocation() {
    if (this.platform.is('capacitor')) {
      let permissionRequested = await Geolocation.checkPermissions();
      if (permissionRequested.location !== 'granted') {
        permissionRequested = await Geolocation.requestPermissions({
          permissions: ['coarseLocation', 'location'],
        });
      }
      if (permissionRequested.location !== 'granted') {
        throw new Error('Permission not granted for location');
      }
      this.watchPosition();
    }
  }

  watchPosition() {
    Geolocation.watchPosition(
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 },
      (position, err) => {
        if (err) {
          return;
        }
        if (!position) {
          return;
        }
        this.currentLocation.next(position);
      }
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

  async markAttendance(userId: any) {
    
    const attendanceRef = doc(
      this.firestore,
      Config.formSettingVariable.attendance,
      this.currentYear,
      this.monthsArray[this.currentMonth],
      userId.toString()
    );

    await getDoc(attendanceRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const attendanceData = docSnapshot.data();
        if (!(this.todayDate in attendanceData)) {
          setDoc(
            attendanceRef,
            {
              ...attendanceData,
              [this.todayDate]: { present: true, offPremises: 0 },
            },
            { merge: true }
          );
        }
      } else {
        setDoc(attendanceRef, {
          [this.todayDate]: { present: true, offPremises: 0 },
        });
      }
    });
  }

  async markEmployeeAttendance(userId: any, atdData: any) {
    try {
      if (!userId || !atdData) {
        throw new Error('Invalid Data');
      }
      const attendanceDocRef = doc(
        this.firestore,
        Config.formSettingVariable.attendance,
        this.currentYear,
        this.monthsArray[this.currentMonth],
        userId.toString()
      );

      const attendanceDoc = await getDoc(attendanceDocRef);

      if (attendanceDoc.exists()) {
        const attendanceData = attendanceDoc.data();

        atdData = { ...attendanceData, [this.todayDate]: atdData };
        setDoc(attendanceDocRef, atdData);
      } else {
        setDoc(attendanceDocRef, { [this.todayDate]: atdData });
      }
    } catch (error) {
      console.error('Error updating today attendance my admin:', error);
    }
  }
}
