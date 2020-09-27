import { Component, Input } from '@angular/core';
import { TransformedTransaction } from '../../core/transactions.service';

type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': 'asc', '': 'asc' };

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  @Input() transactions: TransformedTransaction[];
  filterText: string;
  sortColumn: string = 'date';
  sortDirection: SortDirection = 'desc';
  type: string = 'date';

  sort(column: string, type: string): void {
    if (!this.sortColumn || this.sortColumn === column) {
      this.sortDirection = rotate[this.sortDirection];
    }
    this.type = type;
    this.sortColumn = column;
  }
}
