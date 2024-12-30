import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { StartComponent } from './pages/start/start.component';
import { PortalAuthOptionsComponent } from './pages/portal-auth-options/portal-auth-options.component';

const authPages = [StartComponent, PortalAuthOptionsComponent];
const angularDefaultModules = [CommonModule];

@NgModule({
  declarations: [AuthComponent, ...authPages],
  imports: [AuthRoutingModule, ...angularDefaultModules],
})
export class AuthModule {}
