import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public displayImage: any = 'https://ik.imagekit.io/xji6otwwkb/Profile.png';
  constructor() {}

  editProfileForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required]),
    dob: new FormControl(),
    gender: new FormControl(null, [Validators.required]),
    id: new FormControl(''),
  });

  ngOnInit() {}

  dispDate(e: any) {
    const date: any = new DatePipe('en-US').transform(e.target.value, 'dd MMM');
    console.log(date);
  }

  async changePhoto(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.displayImage = reader.result;
    };
  }

  async onSubmit() {}
}
