import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TransactionsComponent, SortColumn, SortDirection, ColumnType } from './transactions.component';
import { SharedModule } from '../../shared/shared.module';
import mockTransactionsData from '../../shared/data/transactions-test-data';
import { DebugElement, Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TransformedTransaction } from '../../shared/model/transformed-transaction';

@Component({
  selector: 'app-transaction',
  template: ''
})

class TransactionMockComponent {
  @Input() transaction: TransformedTransaction;
}

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsComponent, TransactionMockComponent],
      imports: [SharedModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.transactions = mockTransactionsData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should assign 'date' to columnToBeSorted after detectChanges()`, () => {
    expect(component.columnToBeSorted).toBe(SortColumn.Date);
  });

  it(`should assign 'date' to type after detectChanges()`, () => {
    expect(component.type).toBe(ColumnType.Date);
  });

  it(`should assign 'desc' to sortDirection after detectChanges()`, () => {
    expect(component.sortDirection).toBe(SortDirection.DESC);
  });

  it('should hide and display clear-filter element based on input field value', fakeAsync(() => {
    let clearFilterDe = debugElement.query(By.css('.clear-filter'));
    expect(clearFilterDe).toBeNull();

    const inputDe = debugElement.query(By.css('input'));
    const inputEl = inputDe.nativeElement;

    inputEl.value = 'some value';
    inputEl.dispatchEvent(new Event('input'));
    tick();

    fixture.detectChanges();

    clearFilterDe = debugElement.query(By.css('.clear-filter'));
    expect(clearFilterDe.nativeElement).toBeTruthy();
  }));

  it('should clear the search field value on clear-filter click', fakeAsync(() => {
    const inputDe = debugElement.query(By.css('input'));
    const inputEl = inputDe.nativeElement;

    inputEl.value = 'some value';
    inputEl.dispatchEvent(new Event('input'));
    tick();

    fixture.detectChanges();

    expect(inputEl.value).toBe('some value');

    const clearFilterDe = debugElement.query(By.css('.clear-filter'));
    clearFilterDe.nativeElement.dispatchEvent(new Event('click'));
    expect(inputEl.value).toBe('');
  }));

  it(`should set sort direction to column 'date'`, () => {
    const buttonDe = debugElement.queryAll(By.css('button'));
    buttonDe[0].nativeElement.click();

    expect(component.columnToBeSorted).toBe(SortColumn.Date);
    expect(component.sortDirection).toBe(SortDirection.ASC);

    buttonDe[0].nativeElement.click();
    expect(component.sortDirection).toBe(SortDirection.DESC);
  });

  it(`should add 'desc' or 'asc' class to column 'merchant' based on sort direction`, () => {
    const buttonDe = debugElement.queryAll(By.css('button'));
    buttonDe[1].nativeElement.click();

    fixture.detectChanges();
    expect(buttonDe[1].query(By.css('span')).nativeElement).toHaveClass('desc');

    buttonDe[1].nativeElement.click();

    fixture.detectChanges();
    expect(buttonDe[1].query(By.css('span')).nativeElement).toHaveClass('asc');
  });

  it('should display transaction child elements', () => {
    const transactionDe = debugElement.queryAll(By.css('app-transaction'));

    expect(transactionDe.length).toBe(2);
  });

  it(`should sort app-transaction component on 'date' button click`, () => {
    let transactionDe = debugElement.queryAll(By.css('app-transaction'));
    let firstMerchantName = transactionDe[0].componentInstance.transaction.merchant;

    expect(firstMerchantName).toBe('Amazon Online Store');

    const buttonDe = debugElement.queryAll(By.css('button'));
    buttonDe[0].nativeElement.click();

    fixture.detectChanges();

    transactionDe = debugElement.queryAll(By.css('app-transaction'));
    firstMerchantName = transactionDe[0].componentInstance.transaction.merchant;
    expect(firstMerchantName).toBe('Backbase');
  });

  it('should filter the transactions', fakeAsync(() => {
    let transactionDe = debugElement.queryAll(By.css('app-transaction'));

    expect(transactionDe.length).toBe(2);

    const inputEl = debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'backbase';
    inputEl.dispatchEvent(new Event('input'));
    tick();

    fixture.detectChanges();

    transactionDe = debugElement.queryAll(By.css('app-transaction'));
    expect(transactionDe.length).toBe(1);
    expect(transactionDe[0].componentInstance.transaction.merchant).toBe('Backbase');
  }));
});
