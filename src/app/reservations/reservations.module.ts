import { NgModule } from '@angular/core';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';

@NgModule({
  declarations: [ReservationsComponent],
  imports: [ReservationsRoutingModule],
})
export class ReservationsModule {}
