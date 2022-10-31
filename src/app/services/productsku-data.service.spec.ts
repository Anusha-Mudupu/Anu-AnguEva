import { TestBed } from '@angular/core/testing';

import { ProductskuDataService } from './productsku-data.service';

describe('ProductskuDataService', () => {
  let service: ProductskuDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductskuDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
