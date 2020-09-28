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

  /**
   * @summary Fetches transactions and maps to an array of merchants
   * @returns an observable of merchants
   */
  getMerchants(): Observable<Merchant[]> {
    return this.transactionsService.getTransactionsFromAPI().pipe(
      map(transactions => {
        return transactions.map(transaction => transaction.merchant).reduce((merchants, currentMerchant) => {
          if (!merchants.find(merchant => merchant.name === currentMerchant.name)) {
            merchants.push(currentMerchant);
          }
          return merchants;
        }, []);
      })
    );
  }
}

