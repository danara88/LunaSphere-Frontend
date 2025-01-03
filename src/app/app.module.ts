import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const angularDefaultModules = [BrowserModule, CommonModule];

@NgModule({
  declarations: [AppComponent],
  imports: [...angularDefaultModules, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
