/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { TestBed } from '@angular/core/testing';

import { StaffDataService } from './staff-data.service';

describe('StaffDataService', () => {
  let service: StaffDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
