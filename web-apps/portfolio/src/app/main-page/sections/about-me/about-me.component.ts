import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements AfterViewInit {
  @ViewChild('test')
  private test?: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if (!this.test) {
      return;
    }

    const test = gsap.timeline({
      scrollTrigger: {
        scroller: document.body.querySelector('.scrollable-page'),
        trigger: this.test.nativeElement,
        toggleActions: 'restart pause resume none',
        start: 'top bottom',
        end: 'top top'
      }
    });

    test.from(this.test.nativeElement, { y: 40, opacity: 0, duration: 2 });
  }
}
