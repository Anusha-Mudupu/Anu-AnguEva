/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShipOptionSelectComponent } from './ship-option-select.component';

describe('ShipOptionSelectComponent', () => {
  let component: ShipOptionSelectComponent;
  let fixture: ComponentFixture<ShipOptionSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipOptionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipOptionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
