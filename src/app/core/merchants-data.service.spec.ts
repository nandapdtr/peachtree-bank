import { TestBed } from '@angular/core/testing';

import { MerchantsDataService } from './merchants-data.service';

describe('MerchantsDataService', () => {
  let service: MerchantsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
