import { TestBed } from '@angular/core/testing';

import { RatingserviceService } from './ratingservice.service';

describe('RatingserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RatingserviceService = TestBed.get(RatingserviceService);
    expect(service).toBeTruthy();
  });
});
