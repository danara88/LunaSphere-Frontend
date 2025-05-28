import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  signal,
  viewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, map, Observable, take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { VerifyVerificationCodeRequest } from '@/auth/auth.schema';
import { accountVerificationRequested, resendVerificationCodeRequested } from '@/auth/store';
import { ButtonTypeEnum } from '@/shared/components/luna-sphere-button/models/luna-sphere-button.model';
import { LunaSphereInputNumberComponent } from '@/shared/components/luna-sphere-input-number/luna-sphere-input-number.component';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrl: './account-verification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountVerificationComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _store = inject(Store);

  private readonly _lunaSphereNumberInputs = viewChildren(LunaSphereInputNumberComponent);
  private readonly _verificationToken = signal('');
  private readonly _selectedInputIndex = signal(0);
  private readonly _timerCountDownToGetNewCode$: Observable<number> = interval(1000).pipe(
    take(61),
    map((i) => 60 - i)
  );

  readonly verifyCodesForm: FormGroup;
  readonly buttonTypeEnum = signal(ButtonTypeEnum);
  readonly countDown = toSignal(this._timerCountDownToGetNewCode$, { initialValue: 60 });

  constructor() {
    this.verifyCodesForm = this._formBuilder.group({
      digit1: [undefined, [Validators.required]],
      digit2: [undefined, [Validators.required]],
      digit3: [undefined, [Validators.required]],
      digit4: [undefined, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._lunaSphereNumberInputs()[0].focus();
    this._verificationToken.set(this._activatedRoute.snapshot.params['verificationToken']);
    this.verifyCodesForm.valueChanges.subscribe(() => {
      if (!this.isSomeFormControlEmpty()) {
        this.handleAccountVerificationRequest();
      }
    });
  }

  resendVerificationCode(): void {
    if (this.countDown() !== 0) return;
    this._store.dispatch(
      resendVerificationCodeRequested({ verificationToken: this._verificationToken() })
    );
  }

  handleInputChange(): void {
    this._selectedInputIndex.update((currIndex) => currIndex + 1);
    if (this._selectedInputIndex() >= this._lunaSphereNumberInputs().length) return;
    this._lunaSphereNumberInputs()[this._selectedInputIndex()].focus();
  }

  private handleAccountVerificationRequest() {
    const digit1 = parseInt(this.verifyCodesForm.controls['digit1'].value);
    const digit2 = parseInt(this.verifyCodesForm.controls['digit2'].value);
    const digit3 = parseInt(this.verifyCodesForm.controls['digit3'].value);
    const digit4 = parseInt(this.verifyCodesForm.controls['digit4'].value);

    const code = digit1.toString() + digit2.toString() + digit3.toString() + digit4.toString();
    const verifyVerificationCodeRequest: VerifyVerificationCodeRequest = {
      verificationCode: parseInt(code),
      userEligibleForVerification: {
        encrytedVerificationToken: this._verificationToken(),
      },
    };

    this._store.dispatch(accountVerificationRequested({ verifyVerificationCodeRequest }));
  }

  private isSomeFormControlEmpty(): boolean {
    const emptyValues = [undefined, null];
    return Object.keys(this.verifyCodesForm.controls).some((control) => {
      const controlValue = this.verifyCodesForm.controls[control].value;
      return emptyValues.includes(controlValue);
    });
  }
}
