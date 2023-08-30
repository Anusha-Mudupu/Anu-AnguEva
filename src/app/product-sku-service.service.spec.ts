/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { TestBed } from '@angular/core/testing';

import { ProductSkuServiceService } from './product-sku-service.service';

describe('ProductSkuServiceService', () => {
  let service: ProductSkuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSkuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
