import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-localization-switch',
  templateUrl: './localization-switch.component.html',
  styleUrls: ['./localization-switch.component.scss']
})
export class LocalizationSwitchComponent {
  @Output()
  public changeLocalization = new EventEmitter<boolean>();

  public changeLanguage(newValue: boolean) {
    this.changeLocalization.emit(newValue);
  }
}
