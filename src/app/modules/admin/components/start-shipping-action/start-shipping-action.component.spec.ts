import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartShippingActionComponent } from './start-shipping-action.component';

describe('StartShippingActionComponent', () => {
  let component: StartShippingActionComponent;
  let fixture: ComponentFixture<StartShippingActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartShippingActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartShippingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
