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

export class AccountExpenseService {
    constructor(
        public firestore: Firestore
    ) { }

    getAccounts() {
        return getDocs(collection(this.firestore, Config.collection.account));
    }

    addAccounts(accountData: any) {
        if (!accountData.id) {
            return addDoc(collection(this.firestore, Config.collection.account), accountData);
        } else {
            return updateDoc(doc(this.firestore, Config.collection.account, accountData.id), accountData);
        }
    }

    deleteAccount(accountId: string) {
        return deleteDoc(doc(this.firestore, Config.collection.account, accountId));
    }

    updAccountStatus(accountId: string, status: boolean) {
        return updateDoc(doc(this.firestore, Config.collection.account, accountId), { active: status });
    }

    getExpenseType() {
        return getDocs(collection(this.firestore, Config.collection.expenseType));
    }

    addExpenseType(expenseData: any) {
        if (!expenseData.id) {
            return addDoc(collection(this.firestore, Config.collection.expenseType), expenseData);
        } else {
            return updateDoc(doc(this.firestore, Config.collection.expenseType, expenseData.id), expenseData);
        }
    }

    deleteExpenseType(expenseId: string) {
        return deleteDoc(doc(this.firestore, Config.collection.expenseType, expenseId));
    }

    updExpenseType(expenseId: string, status: boolean) {
        return updateDoc(doc(this.firestore, Config.collection.expenseType, expenseId), { active: status });
    }
}
