import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { JupiterIconElement } from './app/lit-components/icon-element';

JupiterIconElement.addIconsToStore('icons', 'assets/icons');
gsap.registerPlugin(ScrollTrigger);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
