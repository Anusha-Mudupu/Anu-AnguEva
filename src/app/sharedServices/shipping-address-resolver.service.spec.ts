import { TestBed } from '@angular/core/testing';

import { ShippingAddressResolverService } from './shipping-address-resolver.service';

describe('ShippingAddressResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShippingAddressResolverService = TestBed.get(ShippingAddressResolverService);
    expect(service).toBeTruthy();
  });
});
