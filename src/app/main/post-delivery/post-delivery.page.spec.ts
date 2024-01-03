import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDeliveryPage } from './post-delivery.page';

describe('PostDeliveryPage', () => {
  let component: PostDeliveryPage;
  let fixture: ComponentFixture<PostDeliveryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostDeliveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
