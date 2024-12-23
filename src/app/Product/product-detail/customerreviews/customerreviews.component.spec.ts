/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerreviewsComponent } from './customerreviews.component';

describe('CustomerreviewsComponent', () => {
  let component: CustomerreviewsComponent;
  let fixture: ComponentFixture<CustomerreviewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
