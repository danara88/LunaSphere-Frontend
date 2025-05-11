import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterUserDTO } from '@/auth/auth.schema';
import { GoogleService } from '@/auth/services/google.service';
import { AuthState, registerUserRequested } from '@/auth/store';
import { ButtonVariantEnum } from '@/shared/components/luna-sphere-button/models/luna-sphere-button.model';
import { InputTypeEnum } from '@/shared/components/luna-sphere-form-control/models/luna-sphere-form-control.model';
import { FormUtils } from '@/shared/utils/form-utils';
import { Icon } from '@/shared/models/app-icons.enum';

@Component({
  selector: 'app-standard-user-register',
  templateUrl: './standard-user-register.component.html',
  styleUrl: './standard-user-register.component.scss',
})
export class StandardUserRegisterComponent implements OnInit, AfterViewInit {
  readonly emailIcon = Icon.MAIL_OUTLINE;
  readonly passwordFieldIcon = Icon.LOCK_OUTLINE;
  readonly inputTypeEnum = InputTypeEnum;
  readonly buttonVariantEnum = ButtonVariantEnum;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly formUtils = FormUtils;
  readonly googleService: GoogleService = inject(GoogleService);
  readonly registerForm: FormGroup;

  constructor(private readonly store: Store<AuthState>) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.formUtils.passwordPattern)]],
    });
  }

  ngOnInit(): void {
    this.googleService.initializeGoogleSignIn();
  }

  ngAfterViewInit(): void {
    this.googleService.renderButton(document.getElementById('google-sign-in-btn')!);
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    const registerUserDTO: RegisterUserDTO = {
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
    };

    this.store.dispatch(registerUserRequested({ registerUserDTO }));
  }
}
