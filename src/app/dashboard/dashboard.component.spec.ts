import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Component, Input, Output, EventEmitter, DebugElement, enableProdMode } from '@angular/core';
import { Account, UserDataService } from '../core/user-data.service';
import { Merchant, MerchantsDataService } from '../core/merchants-data.service';
import { TransactionData, TransformedTransaction, TransactionsService, Transaction } from '../core/transactions.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { cold, getTestScheduler } from 'jasmine-marbles';
import transactions from '../shared/data/transactions';
import { By } from '@angular/platform-browser';
import userAccountDetails from '../shared/data/user-account-details';
import merchants from '../shared/data/merchants';
import { TransactionOverviewComponent } from './transaction-overview/transaction-overview.component';

@Component({
  selector: 'app-transfer-form',
  template: ''
})
class TransferFormMockComponent {
  @Input() userAccount: Account;
  @Input() merchants: Merchant[];
  @Output() performTransaction: EventEmitter<TransactionData> = new EventEmitter();
}

@Component({
  selector: 'app-transactions',
  template: ''
})
class TransactionsMockComponent {
  @Input() transactions: TransformedTransaction[];
}
@Component({
  template: ''
})
class TransactionOverviewMockComponent {
  @Input() data: TransactionData;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let debugElement: DebugElement;
  let transactionsService: TransactionsService;
  let userDataService: UserDataService;
  let merchantsDataService: MerchantsDataService;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;

  function getDebugElement(selector: string): DebugElement {
    return debugElement.query(By.css(selector));
  }

  const transactionsServiceMock = {
    getTransactions(): void { },
    addTransaction(): void { }
  };

  const merchantsDataServiceMock = {
    getMerchants(): void { }
  };

  const userDataServiceMock = {
    getUserAccountDetails(): void { },
    deductBalance(): void { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TransferFormMockComponent,
        TransactionsMockComponent,
        TransactionOverviewMockComponent
      ],
      providers: [
        NgbModal,
        { provide: TransactionsService, useValue: transactionsServiceMock },
        { provide: MerchantsDataService, useValue: merchantsDataServiceMock },
        { provide: UserDataService, useValue: userDataServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    transactionsService = TestBed.inject(TransactionsService);
    userDataService = TestBed.inject(UserDataService);
    merchantsDataService = TestBed.inject(MerchantsDataService);
    modalService = TestBed.inject(NgbModal);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch transactions and send to transactions component', () => {
    const transactions$ = cold('---a|', { a: transactions });
    spyOn(transactionsService, 'getTransactions').and.returnValue(transactions$);

    fixture.detectChanges();

    let transactionsDe = getDebugElement('app-transactions');

    expect(transactionsDe.componentInstance.transactions).toBeNull();

    getTestScheduler().flush();

    fixture.detectChanges();

    transactionsDe = getDebugElement('app-transactions');
    expect(transactionsDe.componentInstance.transactions).toBe(transactions);
  });

  it('should fetch user account details and send to transfer form', () => {
    const userAccountDetails$ = cold('---a|', { a: userAccountDetails });
    spyOn(userDataService, 'getUserAccountDetails').and.returnValue(userAccountDetails$);

    fixture.detectChanges();

    let transforFormDe = getDebugElement('app-transfer-form');

    expect(transforFormDe.componentInstance.transactions).toBeUndefined();

    getTestScheduler().flush();

    fixture.detectChanges();

    transforFormDe = getDebugElement('app-transfer-form');
    expect(transforFormDe.componentInstance.userAccount).toEqual(userAccountDetails);
  });

  it('should fetch user account details and send to transfer form', () => {
    const merchants$ = cold('---a|', { a: merchants });
    spyOn(merchantsDataService, 'getMerchants').and.returnValue(merchants$);

    fixture.detectChanges();

    let transforFormDe = getDebugElement('app-transfer-form');

    expect(transforFormDe.componentInstance.transactions).toBeUndefined();

    getTestScheduler().flush();

    fixture.detectChanges();

    transforFormDe = getDebugElement('app-transfer-form');
    expect(transforFormDe.componentInstance.merchants).toEqual(merchants);
  });

  it('should open modal popup', () => {
    const appTranferFormDe = getDebugElement('app-transfer-form');
    spyOn(modalService, 'open');

    fixture.detectChanges();

    appTranferFormDe.componentInstance.performTransaction.emit();

    expect(modalService.open).toHaveBeenCalledWith(TransactionOverviewComponent, { centered: true });
  });

  it('Should open the modal and close', fakeAsync(() => {
    const appTranferFormDe = getDebugElement('app-transfer-form');
    modalRef = modalService.open(TransactionOverviewMockComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    spyOn(transactionsService, 'addTransaction');
    spyOn(userDataService, 'deductBalance');

    fixture.detectChanges();

    appTranferFormDe.componentInstance.performTransaction.emit();

    tick();
    modalRef.close();
    tick();
    expect(transactionsService.addTransaction).toHaveBeenCalled();
  }));

  it('Should open the modal and dismiss', fakeAsync(() => {
    const appTranferFormDe = getDebugElement('app-transfer-form');
    modalRef = modalService.open(TransactionOverviewMockComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    spyOn(transactionsService, 'addTransaction');
    spyOn(userDataService, 'deductBalance');
    spyOn(console, 'log');

    fixture.detectChanges();

    appTranferFormDe.componentInstance.performTransaction.emit();

    tick();
    modalRef.dismiss();
    tick();
    expect(console.log).toHaveBeenCalled();
    expect(transactionsService.addTransaction).not.toHaveBeenCalled();
    expect(userDataService.deductBalance).not.toHaveBeenCalled();
  }));
});
