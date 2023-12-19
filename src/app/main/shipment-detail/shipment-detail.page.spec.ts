import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipmentDetailPage } from './shipment-detail.page';

describe('ShipmentDetailPage', () => {
  let component: ShipmentDetailPage;
  let fixture: ComponentFixture<ShipmentDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShipmentDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
