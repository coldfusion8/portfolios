import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CircleScrollBarComponent } from './circle-scroll-bar.component';

describe('CircleScrollBarComponent', () => {
  let component: CircleScrollBarComponent;
  let fixture: ComponentFixture<CircleScrollBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleScrollBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleScrollBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
