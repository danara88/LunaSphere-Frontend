import { NgModule } from '@angular/core';
import { LunaSphereFormControlComponent } from './luna-sphere-form-control.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [LunaSphereFormControlComponent],
  exports: [LunaSphereFormControlComponent],
})
export class LunaSphereFormControlModule {}
