import { TestBed } from '@angular/core/testing';

import { LoginDetailsResolverService } from './login-details-resolver.service';

describe('LoginDetailsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginDetailsResolverService = TestBed.get(LoginDetailsResolverService);
    expect(service).toBeTruthy();
  });
});
