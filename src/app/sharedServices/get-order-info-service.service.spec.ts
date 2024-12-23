import { TestBed } from '@angular/core/testing';

import { GetOrderInfoServiceService } from './get-order-info-service.service';

describe('GetOrderInfoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetOrderInfoServiceService = TestBed.get(GetOrderInfoServiceService);
    expect(service).toBeTruthy();
  });
});
