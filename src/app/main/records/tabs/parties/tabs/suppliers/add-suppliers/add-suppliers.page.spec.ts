import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSuppliersPage } from './add-suppliers.page';

describe('AddSuppliersPage', () => {
  let component: AddSuppliersPage;
  let fixture: ComponentFixture<AddSuppliersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddSuppliersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
