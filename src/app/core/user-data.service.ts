import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import userAccountDetails from '../shared/data/user-account-details';

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

    private accountDetails = { ...userAccountDetails };

    private accountDetails$: BehaviorSubject<Account> = new BehaviorSubject(this.accountDetails);

    getUserAccountDetails(): Observable<Account> {
        return this.accountDetails$.asObservable();
    }

    deductBalance(amount: number): void {
        const remainingBalance = this.accountDetails.balance - amount;
        this.accountDetails = { ...this.accountDetails, ...{ balance: remainingBalance } };
        this.accountDetails$.next(this.accountDetails);
    }
}
