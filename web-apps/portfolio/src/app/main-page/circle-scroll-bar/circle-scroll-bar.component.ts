import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { ScrollRingComponent } from './scroll-ring/scroll-ring.component';

@Component({
  selector: 'app-circle-scroll-bar',
  templateUrl: './circle-scroll-bar.component.html',
  styleUrls: ['./circle-scroll-bar.component.scss']
})
export class CircleScrollBarComponent implements AfterViewInit, OnChanges {
  @ViewChild('circle')
  private circle?: ElementRef<SVGCircleElement>;
  @ViewChild('inner')
  private innerCircle?: ElementRef<SVGCircleElement>;
  @ViewChild('outer')
  private outerCircle?: ElementRef<SVGCircleElement>;
  @ViewChild('middleSphere')
  private middleSphere?: ElementRef<HTMLDivElement>;

  @ViewChild('innerScrollRing')
  private innerScrollRing?: ScrollRingComponent;
  @ViewChild('outerScrollRing')
  private outerScrollRing?: ScrollRingComponent;

  @ViewChild('container')
  private container?: ElementRef<HTMLDivElement>;
  @ViewChild('svg')
  private svg?: ElementRef<SVGElement>;

  @Input()
  public menuItems: string[] = [];

  @Input()
  public percent: number = 0;

  constructor(private readonly elementRef: ElementRef) {
    this.updateCircle = this.updateCircle.bind(this);
    window.addEventListener('resize', this.updateCircle);
  }

  public radius = 100;
  public lineWidth = 10;
  public innerCircleLineWidth = 2;
  public outerCircleLineWidth = 2;

  private circleYPosition = '0';
  private circleRadius = '0';
  private fullCircle = 0;

  ngOnChanges(): void {
    this.changeCircleFill(this.percent);
  }

  ngAfterViewInit(): void {
    this.updateCircle();
    this.changeCircleFill(this.percent);
  }

  private updateCircle() {
    if (
      !this.circle ||
      !this.container ||
      !this.innerCircle ||
      !this.outerCircle ||
      !this.svg ||
      !this.middleSphere ||
      !this.innerScrollRing ||
      !this.outerScrollRing
    ) {
      return;
    }

    this.radius = ((this.elementRef.nativeElement as Element).parentNode as HTMLElement).offsetWidth;

    const containerElement = this.container.nativeElement;
    const circleSVG = this.circle.nativeElement;
    const innerCircle = this.innerCircle.nativeElement;
    const outerCircle = this.outerCircle.nativeElement;
    const svgElement = this.svg.nativeElement;
    const middleSphere = this.middleSphere.nativeElement;
    containerElement.style.width = `${this.radius}px`;
    containerElement.style.height = `${this.radius * 2}px`;

    svgElement.style.width = `${this.radius * 2}px`;
    svgElement.style.height = `${this.radius}px`;
    svgElement.style.top = `${this.radius / 2}px`;
    svgElement.style.left = `${-this.radius / 2}px`;

    this.circleYPosition = `${containerElement.offsetHeight / 2}`;
    this.circleRadius = `${(containerElement.offsetHeight - (this.lineWidth / 2 + this.outerCircleLineWidth) * 2) / 2}`;
    this.fullCircle = parseInt(this.circleRadius) * 2 * Math.PI;

    /* fill */
    circleSVG.setAttribute('r', this.circleRadius);
    circleSVG.setAttribute('cx', this.circleYPosition);
    circleSVG.style.strokeDasharray = `${this.fullCircle}`;
    circleSVG.style.strokeWidth = `${this.lineWidth}`;

    /* inner */
    innerCircle.setAttribute('cx', this.circleYPosition);
    innerCircle.setAttribute('r', `${parseInt(this.circleRadius) - this.lineWidth / 2}`);
    innerCircle.style.strokeWidth = `${this.innerCircleLineWidth}`;

    /* outer */
    outerCircle.setAttribute('cx', this.circleYPosition);
    outerCircle.setAttribute(
      'r',
      `${parseInt(this.circleRadius) + this.lineWidth / 2 + this.outerCircleLineWidth / 2}`
    );
    outerCircle.style.strokeWidth = `${this.outerCircleLineWidth}`;

    /* middle sphere */
    middleSphere.style.width = `${this.radius}px`;
    middleSphere.style.height = `${this.radius}px`;

    /* scrollRings */
    this.innerScrollRing.updateSize(this.radius + this.radius / 5);
    this.outerScrollRing.updateSize(this.radius + this.radius / 2);
    this.changeCircleFill(this.percent);
  }

  public changeCircleFill(percent: number): void {
    if (!this.circle || !this.innerScrollRing || !this.outerScrollRing) {
      return;
    }

    this.innerScrollRing.updatePercent(this.percent);
    this.outerScrollRing.updatePercent(-this.percent);
    this.circle.nativeElement.style.strokeDashoffset = `${(this.fullCircle / 100) * (100 - percent / 2)}`;
  }
}
