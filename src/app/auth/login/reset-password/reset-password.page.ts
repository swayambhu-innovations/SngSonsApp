import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetForm = new FormGroup({
    email: new FormControl(''),
  });
  picker: boolean = false;

  constructor() {}

  ngOnInit() {}
}
