import { Pipe, PipeTransform } from '@angular/core';

enum CreditDebitIndicator {
  CRDT = '+',
  DBIT = '-'
}

@Pipe({
  name: 'creditDebitIndicator'
})
export class CreditDebitIndicatorPipe implements PipeTransform {

  transform(value: string): CreditDebitIndicator {
    if (!value) {
      return;
    }
    return CreditDebitIndicator[value.toUpperCase()];
  }

}
