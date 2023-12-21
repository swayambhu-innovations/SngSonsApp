import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateVoucherPage } from './generate-voucher.page';

describe('GenerateVoucherPage', () => {
  let component: GenerateVoucherPage;
  let fixture: ComponentFixture<GenerateVoucherPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerateVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
