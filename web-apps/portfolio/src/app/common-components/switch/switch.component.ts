import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { DarkModChangeEvent } from '../../Events/DarkModChangeEvent';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  @Output()
  public darkModeChange = new EventEmitter<boolean>();

  constructor(private readonly elementRef: ElementRef) {}

  public checkboxValue = false;

  public valueChange(): void {
    console.log(this.checkboxValue);
    this.darkModeChange.emit(this.checkboxValue);
  }
}
