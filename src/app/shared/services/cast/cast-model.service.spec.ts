import { TestBed } from '@angular/core/testing';

import { CastModelService } from './cast-model.service';

describe('CastModelService', () => {
  let service: CastModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CastModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
