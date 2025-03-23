import { ButtonTypeEnum } from '@/shared/components/luna-sphere-button/models/luna-sphere-button.model';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrl: './account-verification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountVerificationComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly verifyCodesForm: FormGroup;
  readonly buttonTypeEnum = ButtonTypeEnum;

  constructor() {
    this.verifyCodesForm = this.formBuilder.group({
      digit1: [null, [Validators.required]],
      digit2: [null, [Validators.required]],
      digit3: [null, [Validators.required]],
      digit4: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    console.log(this.verifyCodesForm.controls);
  }
}
