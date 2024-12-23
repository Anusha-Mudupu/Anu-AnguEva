import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { describe } from 'jasmine';
import { expect } from 'jasmine';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
