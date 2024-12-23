/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductDetailTileComponent } from './product-detail-tile.component';

describe('ProductDetailTileComponent', () => {
  let component: ProductDetailTileComponent;
  let fixture: ComponentFixture<ProductDetailTileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
