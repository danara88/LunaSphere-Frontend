import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { StartComponent } from './pages/start/start.component';

const authPages = [StartComponent];
const angularDefaultModules = [CommonModule];

@NgModule({
  declarations: [AuthComponent, ...authPages],
  imports: [AuthRoutingModule, ...angularDefaultModules],
})
export class AuthModule {}
