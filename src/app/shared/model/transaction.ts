import { Merchant } from './merchant';

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
