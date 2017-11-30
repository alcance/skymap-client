import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDKaIylUXhUTGqWF63kWkr4w0hrUTPHX2k'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
