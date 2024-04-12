import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperationSettingPage } from './operation-setting.page';

describe('OperationSettingPage', () => {
  let component: OperationSettingPage;
  let fixture: ComponentFixture<OperationSettingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OperationSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
