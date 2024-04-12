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
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Config } from "src/app/config";


@Injectable({
  providedIn: 'root'
})
export class HistoryemployeeService {

  constructor(public firestore: Firestore) { }
  getUsers() {
    return getDocs(collection(this.firestore, Config.formSettingVariable.users));
  }

  adduserOrganizationDetail(userData: any, orgDetail: any) {
    setDoc(
      doc(
        this.firestore,
        Config.formSettingVariable.users,
        userData.phone.toString(),
        Config.formSettingVariable.organization,
        orgDetail
      ),
      {
        orgName: orgDetail,
        roleId: userData.roleName,
        active: true,
        createdAt: serverTimestamp(),
      }
    );
  }

  addUser(userData: any) {
    if (!userData.id) {
      console.log(userData);

      return setDoc(
        doc(this.firestore, Config.formSettingVariable.users, userData.phone.toString()),
        userData
      );
    } else {
      return updateDoc(
        doc(this.firestore, Config.formSettingVariable.users, userData.id),
        userData
      );
    }
  }

  deleteUser(userId: string) {
    return deleteDoc(doc(this.firestore, Config.formSettingVariable.users, userId));
  }

  updUserStatus(userId: string, status: boolean) {
    return updateDoc(doc(this.firestore, Config.formSettingVariable.users, userId), {
      active: status,
    });
  }

  updUserPhoto(userId: string, url: string) {
    return updateDoc(doc(this.firestore, Config.formSettingVariable.users, userId), {
      imageUrl: url,
    });
  }
}
