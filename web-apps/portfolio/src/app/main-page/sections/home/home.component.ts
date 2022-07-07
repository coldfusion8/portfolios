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

  @ViewChild('content')
  public contentBox?: ElementRef<HTMLDivElement>;

  private timerId?: NodeJS.Timeout;

  ngAfterViewInit(): void {
    if (!this.textsWithEffect) {
      return;
    }
    this.spawnBubble = this.spawnBubble.bind(this);

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
    if (!this.contentBox || !this.contentBox.nativeElement.attributes[0]) {
      return;
    }

    const div = document.createElement('div');
    div.classList.add('bubble');

    const random = getRandomWholeNumber(25, 50);
    div.style.width = `${random}px`;
    div.style.height = `${random}px`;

    const posX = getRandomWholeNumber(0, this.contentBox.nativeElement.offsetWidth - random);
    const posY = getRandomWholeNumber(0, this.contentBox.nativeElement.offsetHeight - random);

    div.style.left = `${posX}px`;
    div.style.top = `${posY}px`;

    div.addEventListener('animationend', () => {
      div.remove();
    });
    this.contentBox.nativeElement.appendChild(div);
    div.toggleAttribute(this.contentBox.nativeElement.attributes[0].name, true);
  }
}
