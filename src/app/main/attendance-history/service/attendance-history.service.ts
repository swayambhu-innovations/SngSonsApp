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
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class AttendanceHistoryService {
  constructor(private firestore: Firestore) {}

  monthsArray: { name: string; number: number }[] = [
    { name: 'january', number: 1 },
    { name: 'february', number: 2 },
    { name: 'march', number: 3 },
    { name: 'april', number: 4 },
    { name: 'may', number: 5 },
    { name: 'june', number: 6 },
    { name: 'july', number: 7 },
    { name: 'august', number: 8 },
    { name: 'september', number: 9 },
    { name: 'october', number: 10 },
    { name: 'november', number: 11 },
    { name: 'december', number: 12 },
  ];

  totalPresent = 0;
  totalAbsent = 0;
  attendanceHistory: any[] = [];

  async getAttendanceHistory(empId: any, startDate: any, endDate: any) {
    this.totalPresent = 0;
    this.totalAbsent = 0;
    this.attendanceHistory = [];

    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);

    const attendanceCollection = collection(this.firestore, 'attendance');
    const yearsSnapshot = await getDocs(attendanceCollection);

    for (const yearDoc of yearsSnapshot.docs) {
      const yearId = parseInt(yearDoc.id, 10);

      for (const month of this.monthsArray) {
        const monthName = month.name;
        const docRef = doc(
          this.firestore,
          'attendance',
          yearId.toString(),
          monthName,
          empId
        );
        const monthSnapshot = await getDoc(docRef);

        if (monthSnapshot.exists()) {
          const monthData = monthSnapshot.data();

          for (const [date, item] of Object.entries(monthData)) {
            let stringDate = `${date} ${monthName} ${yearId}`;
            const attendanceRecord = { ...item, date: stringDate };

            const comparisonDate = new Date(stringDate);

            if (isNaN(comparisonDate.getTime())) {
              console.error('Invalid date string');
            } else {
              console.log(dateStart, comparisonDate, dateEnd);
              if (dateStart <= comparisonDate && dateEnd >= comparisonDate) {
                this.attendanceHistory.push(attendanceRecord);
              }
            }

            if (item.present) {
              this.totalPresent += 1;
            } else {
              this.totalAbsent += 1;
            }
          }
        }
      }
    }

    return {
      attendanceHistory: this.attendanceHistory,
      totalPresent: this.totalPresent,
      totalAbsent: this.totalAbsent,
    };
  }
}
