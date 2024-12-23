import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderTrackingComponent } from './order-tracking.component';

describe('OrderTrackingComponent', () => {
  let component: OrderTrackingComponent;
  let fixture: ComponentFixture<OrderTrackingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
