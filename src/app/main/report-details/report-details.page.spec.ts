import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportDetailsPage } from './report-details.page';

describe('ReportDetailsPage', () => {
  let component: ReportDetailsPage;
  let fixture: ComponentFixture<ReportDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReportDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
