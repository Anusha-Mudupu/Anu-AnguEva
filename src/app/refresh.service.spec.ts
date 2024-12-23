/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { TestBed } from '@angular/core/testing';

import { RefreshService } from './refresh.service';

describe('RefreshService', () => {
  let service: RefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
