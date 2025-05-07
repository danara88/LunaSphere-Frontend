import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';

import { AuthService } from '@/auth/services/auth.service';
import {
  accountVerificationFail,
  accountVerificationRequested,
  accountVerificationSuccess,
} from '../auth.actions';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { LoaderConfig } from '@/auth/components/loader/models/loader.model';
import { SpinnerTypeEnum } from '@/shared/components/luna-sphere-spinner/models/luna-sphere-spinner.model';
import { isApiErrorResponse } from '@/shared/utils/api-utils';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationRequestedEffect {
  readonly accountVerificationRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountVerificationRequested),
      switchMap(({ verifyVerificationCodeRequest }) => {
        this._loaderService.showLoader();
        return this._authService.verifyVerificationCode$(verifyVerificationCodeRequest);
      }),
      switchMap((response) => {
        this._loaderService.hideLoader();
        if (isApiErrorResponse(response)) {
          return [accountVerificationFail({ error: response })];
        }
        return [accountVerificationSuccess({ authResponse: response.data })];
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly _loaderService: LoaderService,
    private readonly _authService: AuthService
  ) {
    const loaderConfig: LoaderConfig = {
      title: 'Verifying...',
      description: 'Please wait, we are verifying your code in this moment.',
      spinnerType: SpinnerTypeEnum.DEFAULT,
    };
    this._loaderService.loaderConfig = loaderConfig;
  }
}
