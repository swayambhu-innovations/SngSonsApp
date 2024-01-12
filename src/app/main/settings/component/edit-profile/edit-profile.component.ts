import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { FileuploadService } from 'src/app/utils/fileupload';
import { UtilService } from 'src/app/utils/util';
import { UserPermissionService } from '../user-permission/user-permission.service';
import { Config } from 'src/app/config';
import { NotificationService } from 'src/app/utils/notification';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private loadingController: LoadingController,
    private fileuploadService: FileuploadService,
    private utilService: UtilService,
    private userPermissionService: UserPermissionService,
    private notification: NotificationService
  ) {}

  editProfileForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    dob: new FormControl(),
    gender: new FormControl(null, [Validators.required]),
    id: new FormControl(''),
  });

  displayImage: string = '';
  userData: any = {};
  loader: any;

  async ngOnInit() {
    this.userData = this.utilService.getUserdata();
    this.displayImage = this.utilService.getUserPhoto();
    this.editProfileForm.patchValue({...this.userData.access});
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  dispDate(e: any) {
    const date: any = new DatePipe('en-US').transform(e.target.value, 'dd MMM');
  }

  async changePhoto(e: any) {
    this.loader.present();
    const file = e.target.files[0];
    const url = await this.fileuploadService.uploadFile(file, Config.storage.userPhoto, `${this.userData.access.id}.${file.name.split('.').pop()}`);
    this.displayImage = url;
    await this.updUserPhoto(url);
    this.utilService.setUserdata({photoURL: url});
    this.loader.dismiss();
  }

  async updUserPhoto(url: string) {
    await this.userPermissionService.updUserPhoto(this.userData.access.id, url);
  }

  async onSubmit() {
    if (!this.editProfileForm.valid) {
      this.editProfileForm.markAllAsTouched();
      return;
    }
    const data = { ...this.userData.access, ...this.editProfileForm.value };
    await this.userPermissionService.addUser(data);
    this.notification.showSuccess(Config.messages.updatedSuccessfully);
    this.utilService.setUserdata(data);
    this.loader.dismiss();
  }
}
