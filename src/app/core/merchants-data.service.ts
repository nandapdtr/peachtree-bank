import { Injectable } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Merchant {
  name: string;
  accountNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class MerchantsDataService {

  constructor(
    private transactionsService: TransactionsService
  ) { }

  getMerchants(): Observable<Merchant[]> {
    return this.transactionsService.getTransactionsFromAPI().pipe(
      map(transactions => {
        return transactions.map(txn => txn.merchant).reduce((accu, curr) => {
          if (!accu.find(m => m.name === curr.name)) {
            accu.push(curr);
          }
          return accu;
        }, []);
      })
    );
  }
}

