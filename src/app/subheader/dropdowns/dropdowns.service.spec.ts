/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { TestBed } from '@angular/core/testing';

import { DropdownsService } from './dropdowns.service';

describe('DropdownsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DropdownsService = TestBed.get(DropdownsService);
    expect(service).toBeTruthy();
  });
});
