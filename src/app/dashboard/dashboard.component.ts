import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionsService, TransformedTransaction, TransactionData } from '../core/transactions.service';
import { Merchant, MerchantsDataService } from '../core/merchants-data.service';
import { Account, UserDataService } from '../core/user-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionOverviewComponent } from './transaction-overview/transaction-overview.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  transactions: Observable<TransformedTransaction[]>;
  merchants: Observable<Merchant[]>;
  userAccountDetails: Observable<Account>;

  constructor(
    private transactionsService: TransactionsService,
    private merchantsDataService: MerchantsDataService,
    private userDataService: UserDataService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.transactions = this.transactionsService.getTransactions();
    this.merchants = this.merchantsDataService.getMerchants();
    this.userAccountDetails = this.userDataService.getUserAccountDetails();
  }

  performTransaction(data: TransactionData): void {
    const modalRef = this.modalService.open(TransactionOverviewComponent, { centered: true });
    modalRef.componentInstance.data = data;
    modalRef.result.then(() => {
      this.transactionsService.addTransaction(data);
      this.userDataService.deductBalance(data.amount);
    }).catch(() => {
      console.log('dismiss');
    });
  }

}
