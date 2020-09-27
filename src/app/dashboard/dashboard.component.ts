import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionsService, TransformedTransaction } from '../core/transactions.service';
import { Merchant, MerchantsDataService } from '../core/merchants-data.service';
import { Account, UserDataService } from '../core/user-data.service';

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
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.transactions = this.transactionsService.getTransactions();
    this.merchants = this.merchantsDataService.getMerchants();
    this.userAccountDetails = this.userDataService.getUserAccountDetails();
  }

  performTransaction(data: any): void {
    console.log(data);
  }

}
