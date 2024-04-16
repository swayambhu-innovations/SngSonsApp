import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
} from '@angular/fire/firestore';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { documentId, where } from 'firebase/firestore';
import { Config } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  
  constructor(private storage: Storage, public firestore: Firestore) {}



  getSite() {
    return getDocs(collection(this.firestore, Config.collection.site));
  }

  
  getitems(siteID:string) {
    return getDocs(collection(this.firestore, Config.collection.site,siteID,Config.collection.items));
  }
}
