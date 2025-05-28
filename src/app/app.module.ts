import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { appReducers } from './app.reducers';
import { authEffects } from './auth/store';
import { LunaSphereLoaderModule } from './shared/components/luna-sphere-loader/luna-sphere-loader.module';
import { LunaSphereToastNotificationModule } from './shared/components/luna-sphere-toast-notification/luna-sphere-toast-notification.module';

const angularDefaultModules = [BrowserModule, CommonModule];
const sharedModules = [LunaSphereLoaderModule, LunaSphereToastNotificationModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...angularDefaultModules,
    ...sharedModules,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(authEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
