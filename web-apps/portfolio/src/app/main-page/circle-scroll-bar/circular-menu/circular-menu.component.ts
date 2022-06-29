import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circular-menu',
  templateUrl: './circular-menu.component.html',
  styleUrls: ['./circular-menu.component.scss']
})
export class CircularMenuComponent implements OnChanges, AfterViewInit {
  @ViewChild('menuContainer') private menuContainer?: ElementRef<HTMLDivElement>;
  @Input()
  public menuItems: string[] = [];

  @Input()
  public percent: number = 0;

  @Input()
  public radius: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.updateItemParameters();
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
    this.updateItemParameters();
  }

  private updateItemParameters() {
    if (!this.menuContainer) {
      return;
    }
    const childList = this.menuContainer.nativeElement.querySelectorAll<HTMLDivElement>('.menu-item');
    childList.forEach((menuItem, index) => {
      menuItem.style.width = `${(this.radius + this.radius / 15 + 200) * 2}px`;
      menuItem.style.left = `calc(50% - ${this.radius + this.radius / 15 + 200}px)`;

      menuItem.style.transform = `rotate(${(45 / (childList.length - 1)) * index}deg)`;
    });

    this.menuContainer.nativeElement.style.transform = `rotate(${(45 / 100) * -this.percent}deg)`;
  }
}
