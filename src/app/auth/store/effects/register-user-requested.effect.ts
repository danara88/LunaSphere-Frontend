import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';

import { AuthService } from '@/auth/services/auth.service';
import { ApiErrorResp } from '@/shared/models';
import { registerlUserSuccess, registerUserFail, registerUserRequested } from '../auth.actions';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { LoaderConfig } from '@/auth/components/loader/models/loader.model';
import { SpinnerTypeEnum } from '@/shared/components/luna-sphere-spinner/models/luna-sphere-spinner.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserRequestedEffect {
  readonly registerUserRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUserRequested),
      switchMap(({ registerUserDTO }) => {
        this.loaderService.showLoader();
        return this.authService.registerUser$(registerUserDTO);
      }),
      switchMap((response) => {
        this.loaderService.hideLoader();
        if (this.isApiErrorResponse(response)) {
          return [registerUserFail({ error: response })];
        }
        this.router.navigate(['/auth/verify-account']);
        return [registerlUserSuccess()];
      })
    )
  );

  private isApiErrorResponse(x: unknown | ApiErrorResp): x is ApiErrorResp {
    return (
      !!x &&
      (x as ApiErrorResp).detail !== undefined &&
      (x as ApiErrorResp).title !== undefined &&
      (x as ApiErrorResp).status !== undefined &&
      (x as ApiErrorResp).success === false
    );
  }

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly loaderService: LoaderService,
    private readonly authService: AuthService
  ) {
    const loaderConfig: LoaderConfig = {
      title: 'Verifying...',
      description: 'Please wait, we are processing your account.',
      spinnerType: SpinnerTypeEnum.DEFAULT,
    };
    this.loaderService.loaderConfig = loaderConfig;
  }
}
