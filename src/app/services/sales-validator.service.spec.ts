import { TestBed } from '@angular/core/testing';

import { SalesValidatorService } from './sales-validator.service';

describe('SalesValidatorService', () => {
  let service: SalesValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
