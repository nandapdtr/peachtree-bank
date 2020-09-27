import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type = 'button';
  @Input() disabled: boolean;
  @Input() category = 'btn-primary';
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  onBtnClick(): void {
    this.clicked.emit();
  }
}
