import { Injectable } from "@angular/core";
import {
    Firestore,
    addDoc,
    collection,
    collectionData,
    collectionGroup,
    doc,
    getDoc,
    getDocs,
    query,
    where,
  } from '@angular/fire/firestore';

@Injectable({
    providedIn:'root',
})

export class FormSettingService{
    constructor(public firestore:Firestore){}

    getSettings(formId: string) {
        return getDocs(collection(this.firestore, 'settings', formId, 'variables'));
    }

    addSettings(formId: string, settingData: any) {
        return addDoc(collection(this.firestore, 'settings', formId, 'variables'), settingData);
    }
} 