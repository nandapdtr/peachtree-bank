import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import mockTransactionsData from '../shared/data/transactions';
import { Transaction } from '../shared/model/transaction';
import { TransformedTransaction } from '../shared/model/transformed-transaction';
import { TransactionData } from '../shared/model/transaction-data';

const categoryCodes = mockTransactionsData.map(tansaction => tansaction.categoryCode);

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {

    private mockTransactions: Transaction[] = [...mockTransactionsData];
    private transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject(this.mockTransactions);
    /**
     * @summary Fetches transactions from API
     * @returns an observable of transactions
     */
    getTransactionsFromAPI(): Observable<Transaction[]> {
        return this.transactions$.asObservable();
    }

    /**
     * @summary Fetches transactions from API and maps to TransformedTransaction
     * @returns an observable of transformed transactions
     */
    getTransactions(): Observable<TransformedTransaction[]> {
        return this.getTransactionsFromAPI().pipe(
            map(transactions => this.mapTransactions(transactions))
        );
    }

    /**
     * @summary Adds a new transaction to the existing general ledger
     * @param transactionData - transactionData object that being added
     */
    addTransaction(transactionData: TransactionData): void {
        const request = this.formTransactionRequest(transactionData);
        this.mockTransactions = [...this.mockTransactions, request];
        this.transactions$.next(this.mockTransactions);
    }

    /**
     * @summary Maps the transactions to an array of TransformedTransaction
     * @param transactions - transactions that being mapped to an array of type TransformedTransaction
     * @returns an array of TransformedTransaction
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
     * @summary Formats a string to kebab-case
     * @param merchant - merchant name that being formatted to kebab-case
     * @returns kebab-case string
     */
    private getIconName(merchant: string): string {
        return merchant.replace(/\s/g, '-').toLowerCase();
    }

    /**
     * @summary Maps the transaction data to transaction
     * @param transactionData - transactionData object that being mapped to transaction
     * @returns a transaction object
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
     * @summary Picks a random categoryCode from an array of categoryCodes
     * @returns a categoryCode for the new transaction
     */
    private getCategoryCode(): string {
        const randomNumber = Math.round(Math.random() * categoryCodes.length);
        return categoryCodes[randomNumber];
    }
}
