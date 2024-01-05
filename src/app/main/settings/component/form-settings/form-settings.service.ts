import { Injectable } from "@angular/core";
import {
    Firestore,
    addDoc,
    updateDoc,
    collection,
    collectionData,
    collectionGroup,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    deleteDoc
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

    updateSettings(formId: string , variableData : any){
        return updateDoc(doc(this.firestore, 'settings', formId , 'variables', variableData?.id), {...variableData});
      }
    
    deleteSettings(formId: string , variableId : string){
        return deleteDoc(doc(this.firestore, 'settings', formId , 'variables' , variableId));
    }  
} 