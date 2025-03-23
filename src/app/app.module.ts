import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { appReducers } from './app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { authEffects } from './auth/store';
import { provideHttpClient } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const angularDefaultModules = [BrowserModule, CommonModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...angularDefaultModules,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(authEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
