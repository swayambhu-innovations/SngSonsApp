import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateZmmVoucherPage } from './generate-zmm-voucher.page';

describe('GenerateZmmVoucherPage', () => {
  let component: GenerateZmmVoucherPage;
  let fixture: ComponentFixture<GenerateZmmVoucherPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerateZmmVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
