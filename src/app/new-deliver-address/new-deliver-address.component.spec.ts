/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeliverAddressComponent } from './new-deliver-address.component';

describe('NewDeliverAddressComponent', () => {
  let component: NewDeliverAddressComponent;
  let fixture: ComponentFixture<NewDeliverAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDeliverAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDeliverAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
