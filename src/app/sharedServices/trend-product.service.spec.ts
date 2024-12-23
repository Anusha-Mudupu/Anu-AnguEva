import { TestBed } from '@angular/core/testing';

import { TrendProductService } from './trend-product.service';

describe('TrendProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrendProductService = TestBed.get(TrendProductService);
    expect(service).toBeTruthy();
  });
});
