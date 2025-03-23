import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from '@auth/pages/start/start.component';
import { PortalAuthOptionsComponent } from '@auth/pages/portal-auth-options/portal-auth-options.component';
import { AuthComponent } from './auth.component';
import { StandardUserRegisterComponent } from './pages/standard-user-register/standard-user-register.component';
import { AccountVerificationComponent } from './pages/account-verification/account-verification.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: StartComponent,
      },
      {
        path: 'portal/:portal',
        component: PortalAuthOptionsComponent,
      },
      {
        path: 'register-individual',
        component: StandardUserRegisterComponent,
      },
      {
        path: 'verify-account',
        component: AccountVerificationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
