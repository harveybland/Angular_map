import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './ui/map/map.component';
import { Map2Component } from './ui/map2/map2.component';
import { Map2ItemComponent } from './ui/map2/map2-item/map2-item.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    MapComponent,
    Map2Component,
    Map2ItemComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
