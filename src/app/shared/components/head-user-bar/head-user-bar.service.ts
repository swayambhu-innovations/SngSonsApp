import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc, setDoc } from "@angular/fire/firestore";

@Injectable({
    providedIn:'root'
})

export class HeadUserBarService{
    constructor(public firestore: Firestore){}

    setDashBoardSetting(settingObject : object) {
        return setDoc(doc(this.firestore , 'dashboardSetting' , 'setting'),settingObject)
    }

    getDashBoardSetting() {
        return getDoc(doc(this.firestore , 'dashboardSetting' , 'setting'))
    }
}