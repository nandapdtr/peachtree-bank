import { Account } from './account';

export interface TransactionData {
    fromAccount: Account;
    toAccount: Account;
    amount: number;
}
