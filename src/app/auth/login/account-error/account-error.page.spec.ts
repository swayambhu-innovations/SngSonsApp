import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountErrorPage } from './account-error.page';

describe('AccountErrorPage', () => {
  let component: AccountErrorPage;
  let fixture: ComponentFixture<AccountErrorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccountErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
