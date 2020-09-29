import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TransactionOverviewComponent } from './transaction-overview/transaction-overview.component';
import { TransactionComponent } from './transactions/transaction/transaction.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [DashboardComponent, TransferFormComponent, TransactionsComponent, TransactionComponent, TransactionOverviewComponent],
  // exports: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class DashboardModule { }
