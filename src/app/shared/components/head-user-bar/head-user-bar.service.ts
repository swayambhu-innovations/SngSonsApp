import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc, setDoc } from "@angular/fire/firestore";

@Injectable({
    providedIn:'root'
})

export class HeadUserBarService{
    constructor(public firestore: Firestore){}

    setDashBoardSetting(settingObject : object, userId: any) {
        return setDoc(doc(this.firestore , 'users' , userId, 'dashboardSetting' , 'setting'),settingObject)
    }

    getDashBoardSetting(userId: any) {
        return getDoc(doc(this.firestore , 'users' , userId  , 'dashboardSetting' ,  'setting'))
    }

    
}