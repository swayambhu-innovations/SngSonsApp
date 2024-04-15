import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierDetailsPage } from './supplier-details.page';

describe('SupplierDetailsPage', () => {
  let component: SupplierDetailsPage;
  let fixture: ComponentFixture<SupplierDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SupplierDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
