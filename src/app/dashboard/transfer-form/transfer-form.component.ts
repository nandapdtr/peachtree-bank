import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { Account } from '../../core/user-data.service';
import { CurrencyCodePipe } from '../../shared/pipes/currency-code.pipe';
import { Merchant } from '../../core/merchants-data.service';

interface InputError {
  [key: string]: boolean;
}

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

  /**
   * @summary Filters the merchants whose name matches with the given text
   * @param text$ - an observable of string that being used to compare with merchant name
   * @returns an array of merchants whose name matches with the given text
   */
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.merchants.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  /**
   * @summary Reads the name of the given merchant
   * @param merchant - merchant object
   * @returns the name of the merchant
   */
  formatter = (merchant: Merchant) => merchant.name;

  constructor(
    private fb: FormBuilder,
    private currencyCodePipe: CurrencyCodePipe
  ) { }

  /**
   * @summary Initializes the form group on userAccount input changes
   * @param changes - the input properties changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userAccount && changes.userAccount.currentValue) {
      this.initializeForm();
    }
  }

  /**
   * @returns amount form control from the transferForm form group
   */
  get amount(): AbstractControl {
    return this.transferForm.get('amount');
  }

  /**
   * @summary Forms transactionData object with from account, to account and amount
   *          details and emits an event to it's parent component with transactionData
   */
  onSubmit(): void {
    const transactionData = { ...this.transferForm.value, ...{ fromAccount: this.userAccount } };
    this.performTransaction.emit(transactionData);
  }

  /**
   * @summary Initializes the form with fromAccount, toAccount and amount controls
   */
  private initializeForm(): void {
    this.transferForm = this.fb.group({
      fromAccount: [{
        value: this.fromAccountDisplayValue(),
        disabled: true
      }],
      toAccount: [undefined, Validators.required],
      amount: [undefined, [Validators.required, this.validateAmount()]]
    });
  }

  /**
   * @summary Validates the amount field for overdraft and zero amount
   * @returns an error object if the overdraft is more than 500 and/or amount entered is zero
   */
  private validateAmount() {
    return (contol: AbstractControl): InputError => {
      const balance = this.userAccount.balance;
      if ((balance - contol.value) < -500) {
        return { overdraft: true };
      } else if (contol.value === 0) {
        return { zeroAmount: true };
      }
      return null;
    }
  }

  /**
   * @summary Creates a string from the user account details in a format
   *          {name}{(accountNumber)} - {currencyCode}{balance}
   * @returns user account details as a string
   */
  private fromAccountDisplayValue(): string {
    const userAccount = this.userAccount;
    const name = userAccount.name;
    const balance = userAccount.balance;
    const currencyCode = this.currencyCodePipe.transform(this.userAccount.currencyCode);
    const accountNumber = userAccount.accountNumber.slice(-4);
    return `${name}(${accountNumber}) - ${currencyCode}${balance}`;
  }
}
