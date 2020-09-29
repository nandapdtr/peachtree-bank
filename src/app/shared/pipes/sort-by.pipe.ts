import { Pipe, PipeTransform } from '@angular/core';
import { TransformedTransaction } from '../model/transformed-transaction';

const stringComparator = (v1: string, v2: string) => (v1.localeCompare(v2));
const numberComparator = (v1: number, v2: number) => (v1 - v2);
const dateComparator = (v1: Date, v2: Date) => (v1.getTime() - v2.getTime());

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  /**
   * @summary Sorts the transactions
   * @param transactions - an array of transactions that being sorted
   * @param [direction=''] - the direction in which the transactions has to be sorted
   * @param [column=''] - the data column that being sorted
   * @param [columnType=''] - the data type of the column that being sorted
   * @returns an array of sorted transactions
   */
  transform(transactions: TransformedTransaction[], direction = '', column = '', columnType = ''): TransformedTransaction[] {
    if (!column || !direction || !columnType) {
      return transactions;
    } else {
      transactions.sort((a, b) => {
        let res: number;
        const v1 = a[column];
        const v2 = b[column];
        switch (columnType) {
          case 'date':
            res = dateComparator(v1, v2);
            break;
          case 'number':
            res = numberComparator(parseFloat(v1), parseFloat(v2));
            break;
          default:
            res = stringComparator(v1, v2);
        }
        return direction === 'asc' ? res : -res;
      });
      return transactions;
    }
  }
}
