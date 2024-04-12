import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecievingDetailPage } from './recieving-detail.page';

describe('RecievingDetailPage', () => {
  let component: RecievingDetailPage;
  let fixture: ComponentFixture<RecievingDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecievingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
