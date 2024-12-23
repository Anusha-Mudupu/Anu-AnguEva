import { TestBed } from '@angular/core/testing';

import { ProductReviewService } from './product-review.service';

describe('ProductReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductReviewService = TestBed.get(ProductReviewService);
    expect(service).toBeTruthy();
  });
});
