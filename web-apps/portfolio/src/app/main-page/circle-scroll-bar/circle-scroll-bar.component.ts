import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circle-scroll-bar',
  templateUrl: './circle-scroll-bar.component.html',
  styleUrls: ['./circle-scroll-bar.component.scss']
})
export class CircleScrollBarComponent implements AfterViewInit, OnChanges {
  @ViewChild('circle')
  private circle?: ElementRef<SVGCircleElement>;

  @Input()
  public percent: number = 0;

  private fullCircle = 566;
  ngOnChanges(): void {
    this.updateCircle(this.percent);
  }

  ngAfterViewInit(): void {
    if (!this.circle) {
      return;
    }

    console.log(this.circle, this.percent);
    this.updateCircle(this.percent);
  }

  private updateCircle(percent: number) {
    if (!this.circle) {
      return;
    }

    this.circle.nativeElement.style.strokeDashoffset = `${(this.fullCircle / 100) * (100 - percent / 2)}`;
  }
}
