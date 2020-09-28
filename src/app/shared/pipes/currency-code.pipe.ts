import { Pipe, PipeTransform } from '@angular/core';

enum CurrencyCode {
  EUR = '€'
}

@Pipe({
  name: 'currencyCode'
})
export class CurrencyCodePipe implements PipeTransform {

  /**
   * @summary Transforms the given string to CurrencyCode
   * @param value - the value that being transformed
   */
  transform(value: string): CurrencyCode {
    return CurrencyCode[value.toUpperCase()];
  }

}
