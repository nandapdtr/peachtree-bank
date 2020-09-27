import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionOverviewComponent } from './transaction-overview/transaction-overview.component';



@NgModule({
  declarations: [DashboardComponent, TransferFormComponent, TransactionsComponent],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [TransactionOverviewComponent]
})
export class DashboardModule { }
