import { TestBed } from '@angular/core/testing';

import { MenuiconsService } from './menuicons.service';

describe('MenuiconsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuiconsService = TestBed.get(MenuiconsService);
    expect(service).toBeTruthy();
  });
});
