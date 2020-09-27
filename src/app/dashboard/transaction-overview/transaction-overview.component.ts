import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent {

  @Input() data: any;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  confirm(): void {
    this.activeModal.close();
  }

}
