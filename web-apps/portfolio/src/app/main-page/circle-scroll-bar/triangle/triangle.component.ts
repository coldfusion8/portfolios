import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})
export class TriangleComponent implements OnChanges {
  @ViewChild('triangle')
  public triangle?: ElementRef<HTMLDivElement>;

  @Input()
  public radius = 0;

  ngOnChanges(): void {
    if (!this.triangle) {
      return;
    }

    this.triangle.nativeElement.setAttribute(
      'style',
      ` border-left: ${this.radius / 15}px solid var(--color-opposite-normal);
        border-top: ${this.radius / 15}px solid transparent;
        border-bottom: ${this.radius / 15}px solid transparent;
        top: calc(50% - ${this.radius / 15}px);
        width: 0;
        height: 0;
        position: absolute;
        transition: border-left var(--transition-short);
        right: -${this.radius / 15 - 1}px;`
    );
  }
}
