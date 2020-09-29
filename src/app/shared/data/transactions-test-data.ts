import { TransformedTransaction } from '../model/transformed-transaction';

export default [{
    merchant: 'Backbase',
    type: 'Salaries',
    date: new Date(),
    amount: 5000,
    currencyCode: 'EUR',
    creditDebitIndicator: 'DBIT',
    iconName: 'icon',
    categoryCode: '#eeeeee'
}, {
    merchant: 'Amazon Online Store',
    type: 'Card Payment',
    date: new Date(new Date().getTime() + 20),
    amount: '22.10',
    currencyCode: 'EUR',
    creditDebitIndicator: 'CRDT',
    iconName: 'icon',
    categoryCode: '#eeeeee'
}] as TransformedTransaction[];
