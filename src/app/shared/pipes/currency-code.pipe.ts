import { Pipe, PipeTransform } from '@angular/core';

enum CurrencyCode {
  EUR = '€'
}

@Pipe({
  name: 'currencyCode'
})
export class CurrencyCodePipe implements PipeTransform {

  transform(value: string): CurrencyCode {
    return CurrencyCode[value.toUpperCase()];
  }

}
