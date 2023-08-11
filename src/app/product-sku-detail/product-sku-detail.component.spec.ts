/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSkuDetailComponent } from './product-sku-detail.component';

describe('ProductSkuDetailComponent', () => {
  let component: ProductSkuDetailComponent;
  let fixture: ComponentFixture<ProductSkuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSkuDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSkuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
});
