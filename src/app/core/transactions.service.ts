import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Merchant } from './merchants-data.service';

export interface Transaction {
  categoryCode: string;
  dates: TransactionDate;
  transaction: TransactionDetails;
  merchant: Merchant;
}

interface TransactionDate {
  valueDate: string | number | Date;
}

interface TransactionDetails {
  amountCurrency: AmountCurrency;
  type: string;
  creditDebitIndicator?: string;
}

interface AmountCurrency {
  amount: number | string;
  currencyCode: string;
}

export interface TransformedTransaction {
  date: Date;
  merchant: string,
  type: string,
  amount: string | number,
  currencyCode: string,
  creditDebitIndicator: string,
  categoryCode: string,
  iconName: string,
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject([{
    "categoryCode": "#12a580",
    "dates": {
      "valueDate": 1600493600000
    },
    "transaction": {
      "amountCurrency": {
        "amount": 5000,
        "currencyCode": "EUR"
      },
      "type": "Salaries",
      "creditDebitIndicator": "CRDT"
    },
    "merchant": {
      "name": "Backbase",
      "accountNumber": "SI64397745065188826"
    }
  }, {
    "categoryCode": "#12a580",
    "dates": {
      "valueDate": 1600387200000
    },
    "transaction": {
      "amountCurrency": {
        "amount": "82.02",
        "currencyCode": "EUR"
      },
      "type": "Card Payment",
      "creditDebitIndicator": "DBIT"
    },
    "merchant": {
      "name": "The Tea Lounge",
      "accountNumber": "SI64397745065188826"
    }
  }, {
    "categoryCode": "#d51271",
    "dates": {
      "valueDate": "2020-09-19"
    },
    "transaction": {
      "amountCurrency": {
        "amount": "84.64",
        "currencyCode": "EUR"
      },
      "type": "Card Payment",
      "creditDebitIndicator": "DBIT"
    },
    "merchant": {
      "name": "Texaco",
      "accountNumber": "SI64397745065188826"
    }
  }, {
    "categoryCode": "#12a580",
    "dates": {
      "valueDate": 1600300800000
    },
    "transaction": {
      "amountCurrency": {
        "amount": "84.76",
        "currencyCode": "EUR"
      },
      "type": "Card Payment",
      "creditDebitIndicator": "DBIT"
    },
    "merchant": {
      "name": "The Tea Lounge",
      "accountNumber": "SI64397745065188826"
    }
  }, {
    "categoryCode": "#c12020",
    "dates": {
      "valueDate": 1600370800000
    },
    "transaction": {
      "amountCurrency": {
        "amount": "22.10",
        "currencyCode": "EUR"
      },
      "type": "Online Transfer",
      "creditDebitIndicator": "DBIT"
    },
    "merchant": {
      "name": "Amazon Online Store",
      "accountNumber": "SI64397745065188826"
    }
  }, {
    "categoryCode": "#c89616",
    "dates": {
      "valueDate": 1600214400000
    },
    "transaction": {
      "amountCurrency": {
        "amount": "46.25",
        "currencyCode": "EUR"
      },
      "type": "Card Payment",
      "creditDebitIndicator": "DBIT"
    },
    "merchant": {
      "name": "7-Eleven",
      "accountNumber": "SI64397745065188826"
    }
  }, {
    "categoryCode": "#e25a2c",
    "dates": {
      "valueDate": 1476721442000
    },
    "transaction": {
      "amountCurrency": {
        "amount": "19.72",
        "currencyCode": "EUR"
      },
      "type": "Online Transfer"
    },
    "merchant": {
      "name": "H&M Online Store",
      "accountNumber": "SI64397745065188826"
    }
  }, {
    "categoryCode": "#1180aa",
    "dates": {
      "valueDate": "2020-09-15"
    },
    "transaction": {
      "amountCurrency": {
        "amount": "68.87",
        "currencyCode": "EUR"
      },
      "type": "Transaction",
      "creditDebitIndicator": "DBIT"
    },
    "merchant": {
      "name": "Jerry Hildreth",
      "accountNumber": "SI64397745065188826"
    }
  }, {
    "categoryCode": "#1180aa",
    "dates": {
      "valueDate": 1600041600000
    },
    "transaction": {
      "amountCurrency": {
        "amount": "52.36",
        "currencyCode": "EUR"
      },
      "type": "Transaction",
      "creditDebitIndicator": "DBIT"
    },
    "merchant": {
      "name": "Lawrence Pearson",
      "accountNumber": "SI64397745065188826"
    }
  }, {
    "categoryCode": "#12a580",
    "dates": {
      "valueDate": 1599955200000
    },
    "transaction": {
      "amountCurrency": {
        "amount": "75.93",
        "currencyCode": "EUR"
      },
      "type": "Card Payment",
      "creditDebitIndicator": "DBIT"
    },
    "merchant": {
      "name": "Whole Foods",
      "accountNumber": "SI64397745065188826"
    }
  }, {
    "categoryCode": "#fbbb1b",
    "dates": {
      "valueDate": 1599868800000
    },
    "transaction": {
      "amountCurrency": {
        "amount": "142.95",
        "currencyCode": "EUR"
      },
      "type": "Online Transfer",
      "creditDebitIndicator": "DBIT"
    },
    "merchant": {
      "name": "Southern Electric Company",
      "accountNumber": "SI64397745065188826"
    }
  }]);

  getTransactionsFromAPI(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  getTransactions(): Observable<TransformedTransaction[]> {
    return this.getTransactionsFromAPI().pipe(
      map(transactions => this.transformTransactions(transactions))
    );
  }

  addTransaction(transaction: any) {
    const request = this.formTransactionRequest(transaction);
    const updatedTransactions = [...this.transactions.value, request];
    this.transactions.next(updatedTransactions);
  }

  private transformTransactions(transactions) {
    return transactions.map(txn => {
      return {
        date: new Date(txn.dates.valueDate),
        merchant: txn.merchant.name,
        type: txn.transaction.type,
        amount: txn.transaction.amountCurrency.amount,
        currencyCode: txn.transaction.amountCurrency.currencyCode,
        creditDebitIndicator: txn.transaction.creditDebitIndicator,
        categoryCode: txn.categoryCode,
        iconName: this.getIconName(txn.merchant.name),
      }
    });
  }

  private getIconName(merchant: string): string {
    return merchant.replace(/\s/g, '-').toLowerCase();
  }

  private formTransactionRequest(transaction: any): Transaction {
    return {
      categoryCode: '#fbbb1b',
      dates: {
        valueDate: new Date().getTime(),
      },
      transaction: {
        amountCurrency: {
          amount: transaction.amount,
          currencyCode: "EUR"
        },
        type: "Online Transfer",
        creditDebitIndicator: "DBIT"
      },
      merchant: {
        name: transaction.toAccount.name,
        accountNumber: transaction.toAccount.accountNumber
      }
    };
  }
}
