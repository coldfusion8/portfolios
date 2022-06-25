import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dark-mode-switch',
  templateUrl: './dark-mode-switch.component.html',
  styleUrls: ['./dark-mode-switch.component.scss']
})
export class DarkModeSwitchComponent {
  @Output()
  public darkModeChange = new EventEmitter<boolean>();

  public changeDarkMode(newValue: boolean) {
    this.darkModeChange.emit(newValue);
  }
}
