import { TestBed } from '@angular/core/testing';

import { ProductDetailNotifyService } from './product-detail-notify.service';

describe('ProductDetailNotifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductDetailNotifyService = TestBed.get(ProductDetailNotifyService);
    expect(service).toBeTruthy();
  });
});
