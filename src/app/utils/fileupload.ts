import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Config } from '../config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, Storage } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class FileuploadService {
    constructor(
        private storage: Storage,
        public firestore: Firestore
    ) { }

    async uploadFile(file: any, path?: string, name?: string) {
        if (!name) {
            name = file.name;
        }
        path = path
            ? path + '/' + name
            : Config.storage.labourParty + '/' + name;
        await uploadBytesResumable(ref(this.storage, path), file);
        return getDownloadURL(ref(this.storage, path));
    }

    deleteFile(file: any, path?: string) {
        path = path
          ? path + '/' + file.name
          : Config.storage.labourParty + '/' + file.name;
        return deleteObject(ref(this.storage, path));
    }
}