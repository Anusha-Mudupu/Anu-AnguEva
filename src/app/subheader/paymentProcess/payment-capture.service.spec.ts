/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { TestBed } from '@angular/core/testing';

import { PaymentCaptureService } from './payment-capture.service';

describe('PaymentCaptureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentCaptureService = TestBed.get(PaymentCaptureService);
    expect(service).toBeTruthy();
  });
});
