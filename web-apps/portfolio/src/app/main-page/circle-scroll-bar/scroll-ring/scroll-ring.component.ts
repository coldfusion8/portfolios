import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroll-ring',
  templateUrl: './scroll-ring.component.html',
  styleUrls: ['./scroll-ring.component.scss']
})
export class ScrollRingComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.updateLineWidth();
  }
  @ViewChild('rotationCircle')
  public rotationCircle?: ElementRef<SVGCircleElement>;
  @ViewChild('svg')
  public svg?: ElementRef<SVGElement>;

  @Input()
  public lineWidth = 10;

  private _percent = 0;

  public updateSize(radius: number): void {
    if (!this.svg || !this.rotationCircle) {
      return;
    }

    this.rotationCircle.nativeElement.setAttribute('r', `${radius / 2}`);
    this.rotationCircle.nativeElement.setAttribute('cx', `${this.svg.nativeElement.clientWidth / 2}`);
    this.rotationCircle.nativeElement.setAttribute('cy', `${this.svg.nativeElement.clientWidth / 2}`);
    this.rotationCircle.nativeElement.style.strokeDasharray = `
    ${this.divideCircle(radius, 24, 10) * 9},${this.divideCircle(radius, 24, 10) * 1}
      `;
    this.svg.nativeElement.style.transform = `rotate(${90 + (180 / 100) * this._percent}deg)`;
    this.updateLineWidth();
  }

  public updatePercent(percent: number): void {
    if (!this.svg) {
      return;
    }
    this._percent = percent;
    this.svg.nativeElement.style.transform = `rotate(${90 + (180 / 100) * percent}deg)`;
  }

  private updateLineWidth() {
    if (!this.rotationCircle) {
      return;
    }
    this.rotationCircle.nativeElement.style.strokeWidth = `${this.lineWidth}`;
  }

  private divideCircle(radius: number, pieces: number, ratio: number): number {
    return (radius * 2 * Math.PI) / pieces / ratio;
  }
}
