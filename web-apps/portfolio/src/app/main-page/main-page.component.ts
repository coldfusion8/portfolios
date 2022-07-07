import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from './types';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements AfterViewInit {
  @ViewChild('scrollable')
  private scrollableContent?: ElementRef<HTMLDivElement>;

  public menuItems: MenuItem[] = [];
  public percent = 0;
  private timeoutId?: NodeJS.Timeout;

  constructor(private readonly elementRef: ElementRef, private readonly translateService: TranslateService) {
    this.updateScroll = this.updateScroll.bind(this);
    this.autoFocusNearbySegment = this.autoFocusNearbySegment.bind(this);
  }

  ngAfterViewInit(): void {
    if (!this.scrollableContent) {
      return;
    }

    this.scrollableContent.nativeElement.addEventListener('scroll', this.updateScroll);
    this.scrollableContent.nativeElement.querySelectorAll('[menuName]').forEach(element => {
      const name = element.getAttribute('menuName');
      if (name) {
        this.menuItems.push({ name: name, content: element, selected: true } as MenuItem);
      }
    });

    this.setElementInView();
  }

  private updateScroll(): void {
    if (!this.scrollableContent) {
      return;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.setElementInView();

    const scrollableElement = this.scrollableContent.nativeElement;

    this.percent =
      (scrollableElement.scrollTop / (scrollableElement.scrollHeight - scrollableElement.offsetHeight)) * 100;

    this.timeoutId = setTimeout(this.autoFocusNearbySegment, 2000);
  }

  public changeDarkMode(newValue: boolean) {
    (this.elementRef.nativeElement as Element).toggleAttribute('dark', newValue);
  }

  public changeLocalization(newValue: boolean) {
    this.translateService.use(newValue ? 'hu-HU' : 'en-US');
  }

  private autoFocusNearbySegment() {
    const rects = this.menuItems.map(menuItem => {
      return Math.abs(menuItem.content.getBoundingClientRect().y);
    });

    this.menuItems[rects.indexOf(Math.min(...rects))].content.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  }

  private setElementInView() {
    const rects = this.menuItems.map(menuItem => {
      return Math.abs(menuItem.content.getBoundingClientRect().y);
    });

    this.menuItems.forEach(element => {
      element.selected = false;
    });

    this.menuItems[rects.indexOf(Math.min(...rects))].selected = true;
  }
}
