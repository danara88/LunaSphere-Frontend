import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';

import { AuthService } from '@/auth/services/auth.service';
import { googleSignInFail, googleSignInRequested, googleSignInSuccess } from '../auth.actions';
import { LoaderService } from '@/shared/services/loader-service/loader.service';
import { LoaderTypeEnum } from '@/shared/components/luna-sphere-loader/models/luna-sphere-loader.model';
import { isApiErrorResponse } from '@/shared/utils/api-utils';

@Injectable({
  providedIn: 'root',
})
export class GoogleSignInRequestedEffect {
  readonly googleSignInRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleSignInRequested),
      switchMap(({ googleSignInDTO }) => {
        this._loaderService.showLoader({
          title: 'Verifying...',
          detail: 'Please wait, we are processing your account.',
          type: LoaderTypeEnum.MODAL_SCREEN,
        });
        return this._authService.googleSignIn$(googleSignInDTO);
      }),
      switchMap((response) => {
        this._loaderService.hideLoader();
        if (isApiErrorResponse(response)) {
          return [googleSignInFail({ error: response })];
        }
        return [googleSignInSuccess({ authResponse: response.data })];
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly _loaderService: LoaderService,
    private readonly _authService: AuthService
  ) {}
}
