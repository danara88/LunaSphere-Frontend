import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';

import { AuthService } from '@/auth/services/auth.service';
import { ApiErrorResp } from '@/shared/models';
import { googleSignInFail, googleSignInRequested, googleSignInSuccess } from '../auth.actions';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { LoaderConfig } from '@/auth/components/loader/models/loader.model';
import { SpinnerTypeEnum } from '@/shared/components/luna-sphere-spinner/models/luna-sphere-spinner.model';

@Injectable({
  providedIn: 'root',
})
export class GoogleSignInRequestedEffect {
  readonly googleSignInRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleSignInRequested),
      switchMap(({ googleSignInDTO }) => {
        this._loaderService.showLoader();
        return this._authService.googleSignIn$(googleSignInDTO);
      }),
      switchMap((response) => {
        this._loaderService.hideLoader();
        if (this.isApiErrorResponse(response)) {
          return [googleSignInFail({ error: response })];
        }
        return [googleSignInSuccess({ authResponse: response.data })];
      })
    )
  );

  // TODO: Move this method to a share folder
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
    private readonly _loaderService: LoaderService,
    private readonly _authService: AuthService
  ) {
    const loaderConfig: LoaderConfig = {
      title: 'Verifying...',
      description: 'Please wait, we are processing your account.',
      spinnerType: SpinnerTypeEnum.DEFAULT,
    };
    this._loaderService.loaderConfig = loaderConfig;
  }
}
