import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransactionsComponent } from './transactions/transactions.component';



@NgModule({
  declarations: [DashboardComponent, TransferFormComponent, TransactionsComponent],
  exports: [DashboardComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
