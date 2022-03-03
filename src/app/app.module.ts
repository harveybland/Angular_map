import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './ui/map/map.component';
import { FormsModule } from '@angular/forms';
import { emissionsComponent } from './ui/emissions/emissions.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    MapComponent,
    emissionsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
