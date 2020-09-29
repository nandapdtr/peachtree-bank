import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOverviewComponent } from './transaction-overview.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TransactionData } from '../../shared/model/transaction-data';

describe('TransactionOverviewComponent', () => {
  let component: TransactionOverviewComponent;
  let fixture: ComponentFixture<TransactionOverviewComponent>;
  let debugElement: DebugElement;

  function getDebugElement(selector: string): DebugElement {
    return debugElement.query(By.css(selector));
  }

  const ngbActiveModal = {
    close(): void { },
    dismiss(): void { }
  };

  const transactionMockData = {
    fromAccount: {
      name: 'from',
      accountNumber: '34567325268',
      currencyCode: 'EUR'
    },
    toAccount: {
      name: 'to',
      accountNumber: '742783482375',
    },
    amount: 1000
  } as TransactionData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionOverviewComponent],
      providers: [
        { provide: NgbActiveModal, useValue: ngbActiveModal }
      ],
      imports: [SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionOverviewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.data = transactionMockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display from account details', () => {
    const fromAccountNameEl = getDebugElement('.from-account-name').nativeElement;
    const fromAccountNumberEl = getDebugElement('.from-account-number').nativeElement;

    expect(fromAccountNameEl.textContent).toBe('from');
    expect(fromAccountNumberEl.textContent).toBe('34567325268');
  });

  it('should display to account details', () => {
    const toAccountNameEl = getDebugElement('.to-account-name').nativeElement;
    const toAccountNumberEl = getDebugElement('.to-account-number').nativeElement;

    expect(toAccountNameEl.textContent).toBe('to');
    expect(toAccountNumberEl.textContent).toBe('742783482375');
  });

  it('should display amount', () => {
    const amountEl = getDebugElement('.amount').nativeElement;

    expect(amountEl.textContent).toBe('€ 1000');
  });

  it('should close the popup', () => {
    const activeModal = TestBed.inject(NgbActiveModal);
    spyOn(activeModal, 'close');
    const buttonEl = getDebugElement('app-button');
    buttonEl.componentInstance.clicked.emit();

    expect(activeModal.close).toHaveBeenCalled();
  });

  it('should dismiss the popup', () => {
    const activeModal = TestBed.inject(NgbActiveModal);
    spyOn(activeModal, 'dismiss');
    const closeEl = getDebugElement('.close').nativeElement;
    closeEl.click();

    expect(activeModal.dismiss).toHaveBeenCalled();
  });
});
