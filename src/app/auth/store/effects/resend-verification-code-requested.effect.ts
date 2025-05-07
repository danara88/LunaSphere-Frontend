import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';

import { AuthService } from '@/auth/services/auth.service';
import {
  resendVerificationCodeFail,
  resendVerificationCodeRequested,
  resendVerificationCodeSuccess,
} from '../auth.actions';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { LoaderConfig } from '@/auth/components/loader/models/loader.model';
import { SpinnerTypeEnum } from '@/shared/components/luna-sphere-spinner/models/luna-sphere-spinner.model';
import { isApiErrorResponse } from '@/shared/utils/api-utils';

@Injectable({
  providedIn: 'root',
})
export class ResendVerificationCodeRequestedEffect {
  readonly resendVerificationCodeRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resendVerificationCodeRequested),
      switchMap(({ verificationToken }) => {
        this._loaderService.showLoader();
        return this._authService.resendVerificationCode$(verificationToken);
      }),
      switchMap((response) => {
        this._loaderService.hideLoader();
        if (isApiErrorResponse(response)) {
          return [resendVerificationCodeFail({ error: response })];
        }
        return [resendVerificationCodeSuccess()];
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly _loaderService: LoaderService,
    private readonly _authService: AuthService
  ) {
    const loaderConfig: LoaderConfig = {
      title: 'Sending...',
      description: 'Please wait, we are sending a new verification code in this moment.',
      spinnerType: SpinnerTypeEnum.DEFAULT,
    };
    this._loaderService.loaderConfig = loaderConfig;
  }
}
