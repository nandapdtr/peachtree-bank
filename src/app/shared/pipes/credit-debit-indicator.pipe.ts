import { Pipe, PipeTransform } from '@angular/core';

enum CreditDebitIndicator {
  CRDT = '+',
  DBIT = '-'
}

@Pipe({
  name: 'creditDebitIndicator'
})
export class CreditDebitIndicatorPipe implements PipeTransform {

  /**
   * @summary Transforms the given string to CreditDebitIndicator
   * @param value - the value that being transformed
   */
  transform(value: string): CreditDebitIndicator {
    if (!value) {
      return;
    }
    return CreditDebitIndicator[value.toUpperCase()];
  }

}
