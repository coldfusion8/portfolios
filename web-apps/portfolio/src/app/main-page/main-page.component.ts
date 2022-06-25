import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements AfterViewInit {
  @ViewChild('scrollable')
  private scrollableContent?: ElementRef<HTMLDivElement>;

  public percent = 0;
  constructor(private readonly elementRef: ElementRef, private readonly translateService: TranslateService) {
    this.updateScroll = this.updateScroll.bind(this);
  }

  ngAfterViewInit(): void {
    console.log('start');
    if (!this.scrollableContent) {
      return;
    }
    console.log(this.scrollableContent);

    this.scrollableContent.nativeElement.addEventListener('scroll', this.updateScroll);
  }

  private updateScroll(): void {
    if (!this.scrollableContent) {
      return;
    }

    const scrollableElement = this.scrollableContent.nativeElement;

    this.percent =
      (scrollableElement.scrollTop / (scrollableElement.scrollHeight - scrollableElement.offsetHeight)) * 100;
  }

  public changeDarkMode(newValue: boolean) {
    (this.elementRef.nativeElement as Element).toggleAttribute('dark', newValue);
  }

  public changeLocalization(newValue: boolean) {
    this.translateService.use(newValue ? 'hu-HU' : 'en-US');
  }
}
