import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Config } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class VehicleCategoryService {
  constructor(public firestore: Firestore) {}

  getVehicleCategoryData() {
    return getDocs(
      collection(this.firestore, Config.collection.vehiclesCategory)
    );
  }

  getPendingVehicles() {
    return getDocs(
      collection(
        this.firestore,
        Config.collection.vehiclesCategory,
        'pending',
        Config.collection.vehicles
      )
    );
  }

  addVehicleCategoryData(formData: any) {
    if (!formData.id) {
      return addDoc(
        collection(this.firestore, Config.collection.vehiclesCategory),
        formData
      );
    } else {
      return updateDoc(
        doc(this.firestore, Config.collection.vehiclesCategory, formData.id),
        formData
      );
    }
  }

  updVehicleCategoryStatus(categoryId: string, status: boolean) {
    return updateDoc(
      doc(this.firestore, Config.collection.vehiclesCategory, categoryId),
      { active: status }
    );
  }

  async isAnyVehicleColl(vehicleCategoryId: string) {
    const docSnap = await getDocs(
      collection(
        this.firestore,
        Config.collection.vehiclesCategory,
        vehicleCategoryId,
        Config.collection.vehicles
      )
    );
    if (docSnap?.docs[0]) return true;
    return false;
  }

  deleteVehicleCategory(deleteId: string) {
    return deleteDoc(
      doc(this.firestore, Config.collection.vehiclesCategory, deleteId)
    );
  }
}
