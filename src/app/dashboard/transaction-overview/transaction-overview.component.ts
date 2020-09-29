import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionData } from '../../shared/model/transaction-data';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent {

  @Input() data: TransactionData;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  /**
   * @summary Closes the modal window
   */
  confirm(): void {
    this.activeModal.close();
  }

  /**
   * @summary Dismisses the modal windows
   */
  dismiss(): void {
    this.activeModal.dismiss();
  }

}
