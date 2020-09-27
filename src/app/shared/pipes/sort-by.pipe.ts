import { Pipe, PipeTransform } from '@angular/core';
import { TransformedTransaction } from '../../core/transactions.service';

const stringComparator = (v1: string, v2: string) => (v1.localeCompare(v2));
const numberComparator = (v1: number, v2: number) => (v1 - v2);
const dateComparator = (v1: Date, v2: Date) => (v1.getTime() - v2.getTime());

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: TransformedTransaction[], direction: string = '', column: string = '', columnType: string): TransformedTransaction[] {
    if (!column || !direction) {
      return value;
    } else {
      value.sort((a, b) => {
        let res;
        const v1 = a[column];
        const v2 = b[column];
        if (columnType === 'date') {
          res = dateComparator(v1, v2);
        } else if (columnType === 'number') {
          res = numberComparator(parseFloat(v1), parseFloat(v2));
        } else {
          res = stringComparator(v1, v2);
        }
        return direction === 'asc' ? res : -res;
      });
      return value;
    }
  }
}
