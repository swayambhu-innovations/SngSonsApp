import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Position } from "@capacitor/geolocation";
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { Platform } from "@ionic/angular";
import { firstValueFrom } from "rxjs";
import { Config } from "src/app/config";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  currentLocation: Subject<Position> = new Subject<Position>();
  // currentPosition: google.maps.LatLngLiteral;
  isValidMarker: boolean = false;
  constructor(public firestore: Firestore, private platform: Platform) {}

  async getArea(areaID: any) {
    return await getDoc(doc(this.firestore, Config.formSettingVariable.areas, areaID));
  }

  setPointerOutside(area: any, currPos: any, circleRadius: any): boolean {
    const distanceInMts = this.getDistanceInMts(
      area.lat,
      area.lng,
      currPos?.lat,
      currPos?.lng
    );

    if (distanceInMts < circleRadius) return true;
    else return false;
  }

  getDistanceInMts(lat1: any, lon1: any, lat2: any, lon2: any) {
    if (lat1 === lat2 && lon1 === lon2) return 0;
    const radlat1 = (Math.PI * lat1) / 180,
      radlat2 = (Math.PI * lat2) / 180,
      theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; // in km
    dist *= 1000; // converted to mts
    dist = Math.floor(dist);
    return dist;
  }
}