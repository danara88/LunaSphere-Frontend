import { VerifyVerificationCodeRequest } from '@/auth/auth.schema';
import { AuthService } from '@/auth/services/auth.service';
import { ButtonTypeEnum } from '@/shared/components/luna-sphere-button/models/luna-sphere-button.model';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrl: './account-verification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountVerificationComponent implements OnInit {
  private _verificationToken: string = '';
  private readonly _authService = inject(AuthService);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
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
  ngOnInit(): void {
    this._verificationToken = this._activatedRoute.snapshot.params['verificationTo'];
  }

  onSubmit(): void {
    console.log(this.verifyCodesForm.controls);
    const digit1 = parseInt(this.verifyCodesForm.controls['digit1'].value);
    const digit2 = parseInt(this.verifyCodesForm.controls['digit2'].value);
    const digit3 = parseInt(this.verifyCodesForm.controls['digit3'].value);
    const digit4 = parseInt(this.verifyCodesForm.controls['digit4'].value);

    const code = digit1.toString() + digit2.toString() + digit3.toString() + digit4.toString();
    const req: VerifyVerificationCodeRequest = {
      verificationCode: parseInt(code),
      userEligibleForVerification: {
        encrytedVerificationToken: this._verificationToken,
      },
    };
    this._authService.verifyVerificationCode$(req).subscribe((resp) => {
      console.log(resp);
    });
  }
}
