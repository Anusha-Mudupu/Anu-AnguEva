/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterProductListComponent } from './filter-product-list.component';

describe('FilterProductListComponent', () => {
  let component: FilterProductListComponent;
  let fixture: ComponentFixture<FilterProductListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
