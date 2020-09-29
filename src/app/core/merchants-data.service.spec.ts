import { TestBed } from '@angular/core/testing';

import { MerchantsDataService } from './merchants-data.service';
import { TransactionsService } from './transactions.service';
import { cold, getTestScheduler } from 'jasmine-marbles';
import transactions from '../shared/data/transactions';

describe('MerchantsDataService', () => {
  let merchantsDataService: MerchantsDataService;
  let transactionsService: TransactionsService;

  const transactionsServiceMock = {
    getTransactionsFromAPI(): void { }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MerchantsDataService,
        { provide: TransactionsService, useValue: transactionsServiceMock }
      ]
    });
    merchantsDataService = TestBed.inject(MerchantsDataService);
    transactionsService = TestBed.inject(TransactionsService);
  });

  it('should be created', () => {
    expect(merchantsDataService).toBeTruthy();
  });

  it('#getMerchants should fetch merchants', () => {
    const transactions$ = cold('---a--|', { a: transactions });
    spyOn(transactionsService, 'getTransactionsFromAPI').and.returnValue(transactions$);

    getTestScheduler().flush();

    merchantsDataService.getMerchants()
      .subscribe(merchants => {
        expect(merchants.length).toBe(10);
        expect(merchants[0]).toEqual({
          name: 'Backbase',
          accountNumber: 'SI64397745065188826'
        });
      });
  });
});
