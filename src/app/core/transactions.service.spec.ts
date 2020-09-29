import { TestBed } from '@angular/core/testing';

import { TransactionsService, Transaction, TransformedTransaction, TransactionData } from './transactions.service';
import mockTransactionsData from '../shared/data/transactions';
import { take } from 'rxjs/operators';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    transactionsService = TestBed.inject(TransactionsService);
  });

  it('should be created', () => {
    expect(transactionsService).toBeTruthy();
  });

  it('#getTransactionsFromAPI should fetch transactions from API', (done: DoneFn) => {
    transactionsService.getTransactionsFromAPI().subscribe((transactions: Transaction[]) => {
      expect(transactions).toEqual(mockTransactionsData);
      done();
    });
  });

  it('#getTransactions should fetch transactions from API and maps to TransformedTransaction', (done: DoneFn) => {
    transactionsService.getTransactions().subscribe((transactions: TransformedTransaction[]) => {
      expect(transactions[0]).toEqual({
        categoryCode: '#12a580',
        date: new Date(1600493600000),
        type: 'Salaries',
        amount: 5000,
        currencyCode: 'EUR',
        creditDebitIndicator: 'CRDT',
        merchant: 'Backbase',
        iconName: 'backbase'
      });
      done();
    });
  });

  it('#addTransaction should add new transaction to the existing transactions', (done: DoneFn) => {
    transactionsService.getTransactionsFromAPI().pipe(
      take(1)
    ).subscribe(txns => {
      expect(txns.length).toBe(11);
    });

    transactionsService.addTransaction({
      fromAccount: {
        name: 'jhghjh',
        accountNumber: '3423545',
        balance: 10000,
        currencyCode: 'EUR'
      },
      toAccount: {
        name: 'hhfttf',
        accountNumber: '32435456576'
      },
      amount: 100
    } as TransactionData);

    transactionsService.getTransactionsFromAPI().pipe(
      take(1)
    ).subscribe(txns => {
      expect(txns.length).toBe(12);
      done();
    });
  });
});
