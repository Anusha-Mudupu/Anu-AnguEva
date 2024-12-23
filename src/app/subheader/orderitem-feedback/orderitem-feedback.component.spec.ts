import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemFeedbackComponent } from './orderitem-feedback.component';

describe('OrderitemFeedbackComponent', () => {
  let component: OrderitemFeedbackComponent;
  let fixture: ComponentFixture<OrderitemFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderitemFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderitemFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
