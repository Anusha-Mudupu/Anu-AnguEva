/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });
});
