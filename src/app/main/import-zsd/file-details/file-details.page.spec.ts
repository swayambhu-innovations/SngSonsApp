import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileDetailsPage } from './file-details.page';

describe('FileDetailsPage', () => {
  let component: FileDetailsPage;
  let fixture: ComponentFixture<FileDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FileDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
