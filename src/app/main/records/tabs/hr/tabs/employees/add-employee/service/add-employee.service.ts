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
import { Config } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class AddEmployeeService {
  constructor(public firestore: Firestore) {}

  async getUsersList() {
    return getDocs(collection(this.firestore, Config.collection.users));
  }

  getRoles() {
    return getDocs(collection(this.firestore, Config.collection.role));
  }

  addUser(userData: any) {
    if (!userData.id) {
      console.log(userData);

      return setDoc(
        doc(this.firestore, Config.collection.users, userData.phone.toString()),
        userData
      );
    } else {
      return updateDoc(
        doc(this.firestore, Config.collection.users, userData.id),
        userData
      );
    }
  }
  async getuserData(userId:any){
      const docRef = doc(
        collection(this.firestore, Config.collection.users),
        userId
      );
  
      try {
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          return docSnapshot;
        } else {
          console.log("Document does not exist!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
      }
    }
  
}
