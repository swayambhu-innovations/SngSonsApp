import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVendorPage } from './add-vendor.page';

describe('AddVendorPage', () => {
  let component: AddVendorPage;
  let fixture: ComponentFixture<AddVendorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
