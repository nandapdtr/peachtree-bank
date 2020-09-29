import { Pipe, PipeTransform } from '@angular/core';
import { TransformedTransaction } from '../model/transformed-transaction';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * @summary Filters the array of transactions
   * @param transactions - an array of transactions that being filtered
   * @param [text=''] - a string that being checked against the fields on which filter needs to be done
   * @param [filterSkipFields=[]] - properties on which filter should not apply
   * @returns an array of transactions
   */
  transform(transactions: TransformedTransaction[], text: string = '', filterSkipFields: string[] = []): TransformedTransaction[] {
    if (!text) {
      return transactions;
    } else {
      return transactions.filter(transaction => {
        return Object.keys(transaction).filter(key => !filterSkipFields.includes(key)).filter(key => {
          return transaction[key] && transaction[key].toString().toLowerCase().includes(text.toLowerCase());
        }).length > 0;
      });
    }
  }

}
