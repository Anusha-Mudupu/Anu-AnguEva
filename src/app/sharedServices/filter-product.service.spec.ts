import { TestBed } from '@angular/core/testing';

import { FilterProductService } from './filter-product.service';

describe('FilterProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterProductService = TestBed.get(FilterProductService);
    expect(service).toBeTruthy();
  });
});
