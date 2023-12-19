import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  displayImage: any =
    'https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697';
  constructor() {}

  ngOnInit() {}

  imgRead(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.displayImage = reader.result;
    };
  }
}
