import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent  implements OnInit {

  @Input() show = false;
  @Input() message = 'Are You Sure?';
  @Output() event = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.event.emit(false);
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.event.emit(true);
      },
    },
  ];

}
