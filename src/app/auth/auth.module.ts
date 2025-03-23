import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { StartComponent } from './pages/start/start.component';
import { PortalAuthOptionsComponent } from './pages/portal-auth-options/portal-auth-options.component';
import { StandardUserRegisterComponent } from './pages/standard-user-register/standard-user-register.component';
import { LunaSphereFormControlModule } from '@/shared/components/luna-sphere-form-control/luna-sphere-from-control.module';
import { LunaSphereButtonModule } from '@/shared/components/luna-sphere-button/luna-sphere-button.module';
import { LunaSphereSpinnerModule } from '@/shared/components/luna-sphere-spinner/luna-sphere-spinner.module';
import { LoaderComponent } from './components/loader/loader.component';
import { AccountVerificationComponent } from './pages/account-verification/account-verification.component';
import { LunaSphereInputNumberModule } from '../shared/components/luna-sphere-input-number/luna-sphere-input-number.module';

const authPages = [
  StartComponent,
  PortalAuthOptionsComponent,
  StandardUserRegisterComponent,
  AccountVerificationComponent,
];

const authComponents = [LoaderComponent];

const angularDefaultModules = [CommonModule, ReactiveFormsModule];

const sharedModules = [
  LunaSphereFormControlModule,
  LunaSphereButtonModule,
  LunaSphereSpinnerModule,
  LunaSphereSpinnerModule,
];

@NgModule({
  declarations: [AuthComponent, ...authPages, ...authComponents],
  imports: [
    AuthRoutingModule,
    ...angularDefaultModules,
    ...sharedModules,
    LunaSphereInputNumberModule,
  ],
})
export class AuthModule {}
