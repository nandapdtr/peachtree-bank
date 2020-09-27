import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CurrencyCodePipe } from './pipes/currency-code.pipe';
import { ButtonComponent } from './button/button.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CreditDebitIndicatorPipe } from './pipes/credit-debit-indicator.pipe';



@NgModule({
  declarations: [HeaderComponent, CurrencyCodePipe, ButtonComponent, SortByPipe, FilterPipe, CreditDebitIndicatorPipe],
  exports: [HeaderComponent, ButtonComponent, SortByPipe, FilterPipe, CreditDebitIndicatorPipe, CurrencyCodePipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
