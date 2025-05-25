import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';

import { AuthService } from '@/auth/services/auth.service';
import {
  accountVerificationFail,
  accountVerificationRequested,
  accountVerificationSuccess,
} from '../auth.actions';
import { LoaderService } from '@/shared/services/loader-service/loader.service';
import { LoaderTypeEnum } from '@/shared/components/luna-sphere-loader/models/luna-sphere-loader.model';
import { isApiErrorResponse } from '@/shared/utils/api-utils';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationRequestedEffect {
  readonly accountVerificationRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountVerificationRequested),
      switchMap(({ verifyVerificationCodeRequest }) => {
        this._loaderService.showLoader({
          title: 'Verifying...',
          detail: 'Please wait, we are verifying your code in this moment.',
          type: LoaderTypeEnum.MODAL_SCREEN,
        });
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
  ) {}
}
