import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import './registerLitComponents';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SidePanelComponent } from './main-page/side-panel/side-panel.component';
import { PageContentComponent } from './main-page/page-content/page-content.component';
import { CircleScrollBarComponent } from './main-page/circle-scroll-bar/circle-scroll-bar.component';
import { SwitchComponent } from './common-components/switch/switch.component';
import { FormsModule } from '@angular/forms';
import { DarkModeSwitchComponent } from './main-page/dark-mode-switch/dark-mode-switch.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { translateHTTPLoaderFactory } from './translateHTTPLoaderFactory';
import { LocalizationSwitchComponent } from './main-page/localization-switch/localization-switch.component';
import { ScrollRingComponent } from './main-page/circle-scroll-bar/scroll-ring/scroll-ring.component';
import { TriangleComponent } from './main-page/circle-scroll-bar/triangle/triangle.component';
import { CircularMenuComponent } from './main-page/circle-scroll-bar/circular-menu/circular-menu.component';
import { HomeComponent } from './main-page/sections/home/home.component';
import { AboutMeComponent } from './main-page/sections/about-me/about-me.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SidePanelComponent,
    PageContentComponent,
    CircleScrollBarComponent,
    SwitchComponent,
    DarkModeSwitchComponent,
    LocalizationSwitchComponent,
    ScrollRingComponent,
    TriangleComponent,
    CircularMenuComponent,
    HomeComponent,
    AboutMeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: translateHTTPLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
