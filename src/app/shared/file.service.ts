import { Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { NotificationService } from '../utils/notification';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    private storage: Storage,
    private notification: NotificationService
  ) {}

  async convertDataUrlToBlob(dataUrl: string) {
    let res = await fetch(dataUrl);
    return res.blob();
  }

  async convertDataUrlToFile(dataUrl: string, fileName: string) {
    /** @description only supports images */
    let blob = await this.convertDataUrlToBlob(dataUrl);
    // currently only supports images
    fileName += '.' + blob.type.split('/')[1];
    return new File([blob], fileName, { type: blob.type });
  }

  async uploadFile(file: File, path: string, objectName: string) {
    // objectName is the name that will be used if any error occurs while uploading or verification
    if (this.verifyImage(file, objectName)) {
      path += `/${file.name}`;
      let fileRef = ref(this.storage, path);
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
    }
    throw new Error(`Error while uploading ${objectName}`);
  }

  verifyImage(file: File | undefined, name: string): boolean {
    if (!file) {
      this.notification.showError(`No ${name} image selected`);
      return false;
    }
    if (!file.type.startsWith('image/')) {
      this.notification.showError(`${name} is not an image`);
      return false;
    }
    if (file.size < 1024 * 1024 * 2) {
      return true;
    }
    this.notification.showError(`${name} image size is greater than 2MB`);
    return false;
  }
}
