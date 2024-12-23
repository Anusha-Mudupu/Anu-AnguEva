import { TestBed } from '@angular/core/testing';

import { DropdownNotifyService } from './dropdown-notify.service';

describe('DropdownNotifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DropdownNotifyService = TestBed.get(DropdownNotifyService);
    expect(service).toBeTruthy();
  });
});
