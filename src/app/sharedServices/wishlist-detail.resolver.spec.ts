import { TestBed } from '@angular/core/testing';

import { WishlistDetailResolver } from './wishlist-detail.resolver';

describe('WishlistDetailResolver', () => {
  let resolver: WishlistDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WishlistDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
