import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishShippingActionComponent } from './finish-shipping-action.component';

describe('FinishShippingActionComponent', () => {
  let component: FinishShippingActionComponent;
  let fixture: ComponentFixture<FinishShippingActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishShippingActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishShippingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
