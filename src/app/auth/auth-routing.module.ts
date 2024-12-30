import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from '@auth/pages/start/start.component';
import { PortalAuthOptionsComponent } from '@auth/pages/portal-auth-options/portal-auth-options.component';
import { AuthComponent } from './auth.component';

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
        path: 'portal/:portal-type',
        component: PortalAuthOptionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
