import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportZSDPage } from './import-zsd.page';

describe('ImportZSDPage', () => {
  let component: ImportZSDPage;
  let fixture: ComponentFixture<ImportZSDPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImportZSDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
