import { Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  @Output()
  public switchChange = new EventEmitter<boolean>();

  constructor(private readonly elementRef: ElementRef) {}

  public checkboxValue = false;

  public valueChange(): void {
    this.switchChange.emit(this.checkboxValue);
  }
}
