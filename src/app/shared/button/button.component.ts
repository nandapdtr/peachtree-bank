import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() disabled: boolean;
  @Input() category: string = 'btn-primary';
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  onBtnClick() {
    this.onClick.emit();
  }
}
