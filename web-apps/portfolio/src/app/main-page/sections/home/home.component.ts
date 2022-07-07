import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { getRandomWholeNumber } from '../../../../utils';
import gsap from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('effect')
  public textsWithEffect?: QueryList<ElementRef<HTMLDivElement>>;

  @ViewChild('bubbleContent')
  public bubbleContent?: ElementRef<HTMLDivElement>;

  private timerId?: NodeJS.Timeout;
  private canSpawnByMouse = true;

  ngAfterViewInit(): void {
    if (!this.textsWithEffect) {
      return;
    }

    this.spawnBubble = this.spawnBubble.bind(this);
    this.spawnBubbleByMouse = this.spawnBubbleByMouse.bind(this);
    this.bubbleContent?.nativeElement.parentElement?.addEventListener('mousemove', this.spawnBubbleByMouse);

    this.timerId = setInterval(this.spawnBubble, 100);
    this.addEffect(this.textsWithEffect, 100);
    this.spawnBubble();
  }

  ngOnDestroy(): void {
    if (!this.timerId) {
      return;
    }

    clearInterval(this.timerId);
  }

  private addEffect(list: QueryList<ElementRef<HTMLDivElement>>, x: number): void {
    list.forEach((element, index) => {
      const test = gsap.timeline({
        scrollTrigger: {
          scroller: document.body.querySelector('.scrollable-page'),
          trigger: element.nativeElement,
          toggleActions: 'restart pause resume none',
          start: 'top bottom',
          end: 'top top'
        }
      });

      test.from(element.nativeElement, { x: index % 2 == 0 ? x : -x, opacity: 0, duration: 2, delay: index / 4 });
    });
  }

  public spawnBubble(): void {
    if (!this.bubbleContent || !this.bubbleContent.nativeElement.attributes[0]) {
      return;
    }

    const div = this.createBubble(this.bubbleContent.nativeElement);

    const posX = getRandomWholeNumber(0, this.bubbleContent.nativeElement.offsetWidth - parseInt(div.style.width));
    const posY = getRandomWholeNumber(0, this.bubbleContent.nativeElement.offsetHeight - parseInt(div.style.width));

    div.style.left = `${posX}px`;
    div.style.top = `${posY}px`;
  }

  public spawnBubbleByMouse(event: MouseEvent): void {
    if (!this.bubbleContent || !this.bubbleContent.nativeElement.attributes[0] || !this.canSpawnByMouse) {
      return;
    }
    const div = this.createBubble(this.bubbleContent.nativeElement);

    div.style.left = `${(event.target as HTMLElement).getBoundingClientRect().x +
      event.offsetX -
      this.bubbleContent.nativeElement.getBoundingClientRect().x}px`;
    div.style.top = `${(event.target as HTMLElement).getBoundingClientRect().y +
      event.offsetY -
      this.bubbleContent.nativeElement.getBoundingClientRect().y}px`;

    this.canSpawnByMouse = false;
    setTimeout(() => {
      this.canSpawnByMouse = true;
    }, 100);
  }

  private createBubble(bubbleContent: HTMLDivElement): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('bubble');

    const random = getRandomWholeNumber(25, 50);
    div.style.width = `${random}px`;
    div.style.height = `${random}px`;

    div.addEventListener('animationend', () => {
      div.remove();
    });
    bubbleContent.appendChild(div);

    /* set viewencapsulation id */
    div.toggleAttribute(bubbleContent.attributes[0].name, true);
    return div;
  }
}
