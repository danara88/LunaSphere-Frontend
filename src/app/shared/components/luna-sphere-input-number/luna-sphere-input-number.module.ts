import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LunaSphereInputNumberComponent } from './luna-sphere-input-number.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [LunaSphereInputNumberComponent],
  exports: [LunaSphereInputNumberComponent],
})
export class LunaSphereInputNumberModule {}
