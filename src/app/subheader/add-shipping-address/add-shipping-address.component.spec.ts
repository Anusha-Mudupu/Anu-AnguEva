/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingAddressComponent } from './add-shipping-address.component';

describe('AddShippingAddressComponent', () => {
  let component: AddShippingAddressComponent;
  let fixture: ComponentFixture<AddShippingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShippingAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
