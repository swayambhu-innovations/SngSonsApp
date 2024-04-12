import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationmanagementPage } from './locationmanagement.page';

describe('LocationmanagementPage', () => {
  let component: LocationmanagementPage;
  let fixture: ComponentFixture<LocationmanagementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocationmanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
