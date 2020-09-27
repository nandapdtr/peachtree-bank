import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Account {
  name: string;
  accountNumber: string;
  balance: number;
  currencyCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private accountDetails: BehaviorSubject<Account> = new BehaviorSubject({
    name: 'Nanda',
    accountNumber: '12234567890',
    balance: 10000,
    currencyCode: 'EUR'
  });

  constructor() { }

  getUserAccountDetails(): Observable<Account> {
    return this.accountDetails.asObservable();
  }

  deductBalance(amount: string) {
    const updatedUserData = { ...this.accountDetails.value };
    updatedUserData.balance -= +amount;
    this.accountDetails.next(updatedUserData);
  }
}
