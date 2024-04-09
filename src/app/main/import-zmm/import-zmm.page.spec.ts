import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportZmmPage } from './import-zmm.page';

describe('ImportZmmPage', () => {
  let component: ImportZmmPage;
  let fixture: ComponentFixture<ImportZmmPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImportZmmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
