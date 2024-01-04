import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerName: any;
  // @Input() backUrl: string = '/main/settings';
  constructor(
    private sharedService: SharedService
  ) {}

  ngOnInit() {}

  refresh() {
    this.sharedService.refresh.next(true);
  }
}
