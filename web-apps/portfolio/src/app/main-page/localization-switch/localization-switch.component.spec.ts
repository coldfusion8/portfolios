import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationSwitchComponent } from './localization-switch.component';

describe('LocalizationSwitchComponent', () => {
  let component: LocalizationSwitchComponent;
  let fixture: ComponentFixture<LocalizationSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalizationSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalizationSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
