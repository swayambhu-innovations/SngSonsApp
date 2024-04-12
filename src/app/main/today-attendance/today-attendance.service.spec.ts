import { TestBed } from '@angular/core/testing';

import { TodayAttendanceService } from './today-attendance.service';

describe('TodayAttendanceService', () => {
  let service: TodayAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodayAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
