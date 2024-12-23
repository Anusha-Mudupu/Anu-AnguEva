import { TestBed } from '@angular/core/testing';

import { SearchResultPageService } from './search-result-page.service';

describe('SearchResultPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchResultPageService = TestBed.get(SearchResultPageService);
    expect(service).toBeTruthy();
  });
});
