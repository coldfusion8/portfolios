import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SidePanelComponent } from './main-page/side-panel/side-panel.component';
import { PageContentComponent } from './main-page/page-content/page-content.component';
import { CircleScrollBarComponent } from './main-page/circle-scroll-bar/circle-scroll-bar.component';
import { SwitchComponent } from './common-components/switch/switch.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SidePanelComponent,
    PageContentComponent,
    CircleScrollBarComponent,
    SwitchComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
