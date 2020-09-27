import { Pipe, PipeTransform } from '@angular/core';
import { TransformedTransaction } from '../../core/transactions.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: TransformedTransaction[], text: any): TransformedTransaction[] {
    if (!text) {
      return value;
    } else {
      return value.filter(d => {
        return Object.keys(d).filter(key => !['creditDebitIndicator', 'categoryCode'].includes(key)).filter(key => {
          return d[key] && d[key].toString().toLowerCase().includes(text.toLowerCase());
        }).length > 0;
      });
    }
  }

}
