import { Component, Input } from '@angular/core';
import { TransformedTransaction } from '../../../shared/model/transformed-transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  @Input() transaction: TransformedTransaction;

  /**
   * @summary Forms a relative path to display an icon
   * @param iconName - name of the icon that being displayed
   * @returns a relative path of the icon
   */
  getIconPath(iconName: string): string {
    return `../../../assets/icons/${iconName}.png`;
  }
}
