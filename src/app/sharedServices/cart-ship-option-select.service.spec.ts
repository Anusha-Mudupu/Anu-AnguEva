import { TestBed } from '@angular/core/testing';

import { CartShipOptionSelectService } from './cart-ship-option-select.service';

describe('CartShipOptionSelectService', () => {
  let service: CartShipOptionSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartShipOptionSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
