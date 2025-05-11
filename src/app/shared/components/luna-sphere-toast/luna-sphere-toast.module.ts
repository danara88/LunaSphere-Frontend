import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LunaSphereToastComponent } from './luna-sphere-toast.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LunaSphereToastComponent],
  exports: [LunaSphereToastComponent],
})
export class LunaSphereToastModule {}
