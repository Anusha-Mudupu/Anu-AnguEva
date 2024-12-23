import { TestBed } from '@angular/core/testing';

import { ElasticSerchService } from './elastic-serch.service';

describe('ElasticSerchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElasticSerchService = TestBed.get(ElasticSerchService);
    expect(service).toBeTruthy();
  });
});
