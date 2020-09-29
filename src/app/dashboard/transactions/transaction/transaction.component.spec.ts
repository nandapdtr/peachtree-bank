import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionComponent } from './transaction.component';
import { SharedModule } from '../../../shared/shared.module';
import { TransformedTransaction } from '../../../core/transactions.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let debugElement: DebugElement;

  const transactionMock = {
    merchant: 'Backbase',
    type: 'Online Transfer',
    creditDebitIndicator: 'CRDT',
    currencyCode: 'EUR',
    amount: 1000,
    date: new Date('2020-09-21'),
    iconName: 'icon'
  } as TransformedTransaction;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransactionComponent
      ],
      imports: [SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.transaction = transactionMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display date in 'MMM. yy' format`, () => {
    const dateElement = debugElement.query(By.css('.date'));

    expect(dateElement.nativeElement.textContent).toBe('Sep. 20');
  });

  it('should dispay the merchant name', () => {
    const merchantElement = debugElement.query(By.css('.merchant'));

    expect(merchantElement.nativeElement.textContent).toBe('Backbase');
  });

  it('should dispay transaction type', () => {
    const transactionTypeElement = debugElement.query(By.css('.transaction-type'));

    expect(transactionTypeElement.nativeElement.textContent).toBe('Online Transfer');
  });

  it('should display amount with creditDebitIndicator and currencyCode', () => {
    const amountElement = debugElement.query(By.css('.transaction-amount'));

    expect(amountElement.nativeElement.textContent).toEqual('+ € 1000');
  });
});
