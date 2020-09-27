import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CurrencyCodePipe } from './pipes/currency-code.pipe';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [HeaderComponent, CurrencyCodePipe, ButtonComponent],
  exports: [HeaderComponent, ButtonComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
