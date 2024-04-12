import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryemployeePage } from './historyemployee.page';

describe('HistoryemployeePage', () => {
  let component: HistoryemployeePage;
  let fixture: ComponentFixture<HistoryemployeePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistoryemployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
