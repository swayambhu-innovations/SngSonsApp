import { Injectable } from "@angular/core";
import { Firestore, addDoc, collection, doc, increment, updateDoc } from "@angular/fire/firestore";
import { Config } from "src/app/config";

@Injectable({
    providedIn:'root'
})

export class VehicleMasterService{

    constructor(public firestore:Firestore){}

    async addVehicleCategoryData(formData : any , vehicleCategoryId : string) {
        await addDoc(collection(this.firestore , Config.collection.vehiclesCategory , vehicleCategoryId , Config.collection.vehicleTypes) , formData);
        await updateDoc(doc(this.firestore,Config.collection.vehiclesCategory , vehicleCategoryId),{count : increment(1)})
        return;
        
    }
}