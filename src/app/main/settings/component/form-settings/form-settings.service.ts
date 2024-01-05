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
import { Config } from "src/app/config";

@Injectable({
    providedIn:'root',
})

export class FormSettingService{
    constructor(public firestore:Firestore){}

    getSettings(formId: string) {
        return getDocs(collection(this.firestore, Config.collection.settings, formId, Config.collection.variables));
    }

    addSettings(formId: string, settingData: any) {
        return addDoc(collection(this.firestore, Config.collection.settings, formId, Config.collection.variables), settingData);
    }

    updateSettings(formId: string , variableData : any){
        return updateDoc(doc(this.firestore, Config.collection.settings, formId , Config.collection.variables, variableData?.id), {...variableData});
      }
    
    deleteSettings(formId: string , variableId : string){
        return deleteDoc(doc(this.firestore, Config.collection.settings, formId , Config.collection.variables , variableId));
    }  

    updAccountStatus(formId: string , status: boolean ,  variableId : string){
        return updateDoc(doc(this.firestore, Config.collection.settings, formId , Config.collection.variables , variableId) , { active: status })
    }
} 