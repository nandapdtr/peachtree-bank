import { Component, Input } from '@angular/core';
import { TransformedTransaction } from '../../../core/transactions.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  @Input() transaction: TransformedTransaction;

  getIconPath(iconName: string): string {
    return `../../../assets/icons/${iconName}.png`;
  }
}
