import { Injectable } from "@angular/core";
import {
    Firestore,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
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

    addUser(userData: any) {
        if (!userData.id) {
            return addDoc(collection(this.firestore, Config.collection.users), userData);
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
}
