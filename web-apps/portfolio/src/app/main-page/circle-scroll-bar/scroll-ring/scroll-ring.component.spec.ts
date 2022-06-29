import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollRingComponent } from './scroll-ring.component';

describe('SrollRingComponent', () => {
  let component: SrollRingComponent;
  let fixture: ComponentFixture<SrollRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SrollRingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SrollRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
