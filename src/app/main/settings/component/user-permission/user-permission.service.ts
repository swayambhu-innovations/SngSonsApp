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
} from '@angular/fire/firestore';
import { Config } from "src/app/config";

@Injectable({
    providedIn: 'root',
})

export class UserPermissionService {
    constructor(
        public firestore: Firestore
    ) { }

    getRoles() {
        return getDocs(collection(this.firestore, Config.collection.role));
    }

    addRole(roleData: any) {
        if (!roleData.id) {
            return addDoc(collection(this.firestore, Config.collection.role), roleData);
        } else {
            return updateDoc(doc(this.firestore, Config.collection.role, roleData.id), roleData);
        }
    }

    deleteAccount(roleId: string) {
        return deleteDoc(doc(this.firestore, Config.collection.role, roleId));
    }

    updRoleStatus(roleId: string, status: boolean) {
        return updateDoc(doc(this.firestore, Config.collection.role, roleId), { active: status });
    }

    getUsers() {
        return getDocs(collection(this.firestore, Config.collection.users));
    }

    checkContactNumber(phone: string) {
        return getDocs(query(collection(this.firestore, Config.collection.users), where(documentId(), '==', phone.toString())));
    }

    addUser(userData: any) {
        if (!userData.id) {
            return setDoc(doc(this.firestore, Config.collection.users, userData.phone.toString()), userData);
        } else {
            return updateDoc(doc(this.firestore, Config.collection.users, userData.id), userData);
        }
    }

    deleteUser(userId: string) {
        return deleteDoc(doc(this.firestore, Config.collection.users, userId));
    }

    updUserStatus(userId: string, status: boolean) {
        return updateDoc(doc(this.firestore, Config.collection.users, userId), { active: status });
    }

    updUserPhoto(userId: string, url: string) {
        return updateDoc(doc(this.firestore, Config.collection.users, userId), { photoURL: url });
    }
}
