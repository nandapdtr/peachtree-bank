import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Account } from '../../core/user-data.service';
import { CurrencyCodePipe } from '../../shared/pipes/currency-code.pipe';
import { Merchant } from '../../core/merchants-data.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
  providers: [CurrencyCodePipe]
})
export class TransferFormComponent implements OnChanges {
  @Input() merchants: Merchant[];
  @Input() userAccount: Account;
  @Output() performTransaction = new EventEmitter();
  transferForm: FormGroup;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.merchants.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (account: Account) => account.name;

  constructor(
    private fb: FormBuilder,
    private currencyCodePipe: CurrencyCodePipe
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userAccount) {
      this.userAccount = changes.userAccount.currentValue;
      this.initializeForm();
      this.checkForBalance();
    }
  }

  checkForBalance(): void {
    this.transferForm.get('amount').valueChanges.subscribe(amount => {
      const balance = this.userAccount.balance;
      if ((balance - +amount) < -500) {
        this.transferForm.get('amount').setErrors({ 'overdraft': true });
      } else if (+amount === 0) {
        this.transferForm.get('amount').setErrors({ 'zero-amount': true });
      } else {
        this.transferForm.get('amount').setErrors(null);
      }
    });
  }

  get amount() {
    return this.transferForm.get('amount');
  }

  onSubmit(): void {
    const transactionDetails = { ...this.transferForm.value, ...{ fromAccount: this.userAccount } };
    this.performTransaction.emit(transactionDetails);
  }

  private initializeForm() {
    this.transferForm = this.fb.group({
      fromAccount: [{
        value: this.fromAccountDisplayValue(),
        disabled: true
      }],
      toAccount: [undefined, Validators.required],
      amount: [undefined, Validators.required]
    });
  }

  private fromAccountDisplayValue() {
    const userAccount = this.userAccount;
    const name = userAccount.name;
    const balance = userAccount.balance;
    const currencyCode = this.currencyCodePipe.transform(this.userAccount.currencyCode);
    const accountNumber = userAccount.accountNumber.slice(-4);
    return `${name}(${accountNumber}) - ${currencyCode}${balance}`;
  }
}
