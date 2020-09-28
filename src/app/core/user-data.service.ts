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

    private accountDetailsSubject$: BehaviorSubject<Account> = new BehaviorSubject(this.accountDetails);

    /**
     * @summary Fetches user account details
     * @returns an observable of user account details
     */
    getUserAccountDetails(): Observable<Account> {
        return this.accountDetailsSubject$.asObservable();
    }

    /**
     * @summary Deducts the balance in the user account
     * @param amount - that being deducted from the user account
     */
    deductBalance(amount: number): void {
        const remainingBalance = this.accountDetails.balance - amount;
        this.accountDetails = { ...this.accountDetails, ...{ balance: remainingBalance } };
        this.accountDetailsSubject$.next(this.accountDetails);
    }
}
