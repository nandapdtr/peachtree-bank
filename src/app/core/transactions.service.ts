import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Merchant } from './merchants-data.service';
import mockTransactionsData from '../shared/data/transactions';
import { Account } from './user-data.service';

export interface Transaction {
    categoryCode: string;
    dates: TransactionDate;
    transaction: TransactionDetails;
    merchant: Merchant;
}

interface TransactionDate {
    valueDate: Date | number | string;
}

interface TransactionDetails {
    amountCurrency: AmountCurrency;
    type: string;
    creditDebitIndicator?: string;
}

interface AmountCurrency {
    amount: number | string;
    currencyCode: string;
}

export interface TransformedTransaction {
    date: Date;
    merchant: string;
    type: string;
    amount: string | number;
    currencyCode: string;
    creditDebitIndicator: string;
    categoryCode: string;
    iconName: string;
}

export interface TransactionData {
    fromAccount: Account;
    toAccount: Account;
    amount: number;
}

const categoryCodes = mockTransactionsData.map(tansaction => tansaction.categoryCode);

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {

    private mockTransactions: Transaction[] = [...mockTransactionsData];
    private transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject(this.mockTransactions);
    /**
     * Returns an observable of transactions
     */
    getTransactionsFromAPI(): Observable<Transaction[]> {
        return this.transactions$.asObservable();
    }

    /**
     * Returns an observable of transformed transactions
     */
    getTransactions(): Observable<TransformedTransaction[]> {
        return this.getTransactionsFromAPI().pipe(
            map(transactions => this.mapTransactions(transactions))
        );
    }

    /**
     * Adds a new transaction to the existing general ledger
     * @param transactionData - transactionData object that being added
     */
    addTransaction(transactionData: TransactionData): void {
        const request = this.formTransactionRequest(transactionData);
        this.mockTransactions = [...this.mockTransactions, request];
        this.transactions$.next(this.mockTransactions);
    }

    /**
     * Returns an array of transactions of type TransformedTransaction
     * @param transactions - transactions that being mapped to an array of type TransformedTransaction
     */
    private mapTransactions(transactions: Transaction[]): TransformedTransaction[] {
        return transactions.map(txn => ({
            date: new Date(txn.dates.valueDate),
            merchant: txn.merchant.name,
            type: txn.transaction.type,
            amount: txn.transaction.amountCurrency.amount,
            currencyCode: txn.transaction.amountCurrency.currencyCode,
            creditDebitIndicator: txn.transaction.creditDebitIndicator,
            categoryCode: txn.categoryCode,
            iconName: this.getIconName(txn.merchant.name)
        }));
    }

    /**
     * Returns a kebab-case string
     * @param merchant - merchant name that being modified to kebab-case
     */
    private getIconName(merchant: string): string {
        return merchant.replace(/\s/g, '-').toLowerCase();
    }

    /**
     * Returns a transaction object than being added to transactions
     * @param transactionData - transactionData object that being mapped to transaction
     */
    private formTransactionRequest(transactionData: TransactionData): Transaction {
        return {
            categoryCode: this.getCategoryCode(),
            dates: {
                valueDate: new Date().getTime(),
            },
            transaction: {
                amountCurrency: {
                    amount: transactionData.amount,
                    currencyCode: 'EUR'
                },
                type: 'Online Transfer',
                creditDebitIndicator: 'DBIT'
            },
            merchant: {
                name: transactionData.toAccount.name,
                accountNumber: transactionData.toAccount.accountNumber
            }
        };
    }

    /**
     * Returns a categoryCode for the new transaction
     */
    private getCategoryCode(): string {
        const randomNumber = Math.round(Math.random() * categoryCodes.length);
        return categoryCodes[randomNumber];
    }
}
