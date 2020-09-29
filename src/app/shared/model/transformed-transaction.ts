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
