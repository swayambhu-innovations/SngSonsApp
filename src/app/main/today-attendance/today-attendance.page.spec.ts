import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayAttendancePage } from './today-attendance.page';

describe('TodayAttendancePage', () => {
  let component: TodayAttendancePage;
  let fixture: ComponentFixture<TodayAttendancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodayAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
