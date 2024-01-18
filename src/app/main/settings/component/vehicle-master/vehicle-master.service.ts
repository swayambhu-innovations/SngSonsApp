import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Config } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class VehicleMasterService {
  constructor(private storage: Storage, public firestore: Firestore) {}

  getCatDetails(vehicleCategoryId: string) {
    let data: any;
    if (vehicleCategoryId)
      data = getDoc(
        doc(
          this.firestore,
          Config.collection.vehiclesCategory,
          vehicleCategoryId
        )
      );
    return data;
  }

  getVehicles(vehicleCategoryId: string) {
    let data: any;
    if (vehicleCategoryId)
      data = getDocs(
        collection(
          this.firestore,
          Config.collection.vehiclesCategory,
          vehicleCategoryId,
          Config.collection.vehicles
        )
      );
    return data;
  }

  getVehicleDetails(vehicleCategoryID: any, vehicleID: string) {
    let data: any;
    if (vehicleID)
      data = getDoc(
        doc(
          this.firestore,
          Config.collection.vehiclesCategory,
          vehicleCategoryID,
          Config.collection.vehicles,
          vehicleID
        )
      );
    return data;
  }

  async uploadFile(file: any, regNo?: string) {
    const path =
      Config.storage.vehicleDocuments + '/' + regNo + '/' + file.name;
    await uploadBytesResumable(ref(this.storage, path), file);
    return getDownloadURL(ref(this.storage, path));
  }

  deleteFile(file: any, path?: string) {
    path = path
      ? path + '/' + file.name
      : Config.storage.vehicleDocuments + '/' + file.name;
    return deleteObject(ref(this.storage, path));
  }

  async addVehicleCategoryData(vehicleData: any, vehicleCategoryId: string) {
    await setDoc(
      doc(
        this.firestore,
        Config.collection.vehiclesCategory,
        vehicleCategoryId,
        Config.collection.vehicles,
        vehicleData.registrationNo.toString()
      ),
      vehicleData
    );
    await updateDoc(
      doc(
        this.firestore,
        Config.collection.vehiclesCategory,
        vehicleCategoryId
      ),
      { count: increment(1) }
    );
    return;
  }

  updVehicleStatus(
    vehicleCategoryId: string,
    vehicleId: string,
    status: boolean
  ) {
    return updateDoc(
      doc(
        this.firestore,
        Config.collection.vehiclesCategory,
        vehicleCategoryId,
        Config.collection.vehicles,
        vehicleId
      ),
      { active: status }
    );
  }

  async deleteVehicle(vehicleCategoryId: string, vehicleId: string) {
    await deleteDoc(
      doc(
        this.firestore,
        Config.collection.vehiclesCategory,
        vehicleCategoryId,
        Config.collection.vehicles,
        vehicleId
      )
    );

    await updateDoc(
      doc(
        this.firestore,
        Config.collection.vehiclesCategory,
        vehicleCategoryId
      ),
      { count: increment(-1) }
    );
    return;
  }
}
