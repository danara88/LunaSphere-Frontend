import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';

import { AuthService } from '@/auth/services/auth.service';
import { registerUserSuccess, registerUserFail, registerUserRequested } from '../auth.actions';
import { LoaderService } from '@/shared/services/loader-service/loader.service';
import { isApiErrorResponse } from '@/shared/utils/api-utils';
import { LoaderTypeEnum } from '@/shared/components/luna-sphere-loader/models/luna-sphere-loader.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserRequestedEffect {
  readonly registerUserRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUserRequested),
      switchMap(({ registerUserDTO }) => {
        this.loaderService.showLoader({
          title: 'Verifying...',
          detail: 'Please wait, we are processing your account.',
          type: LoaderTypeEnum.MODAL_SCREEN,
        });
        return this.authService.registerUser$(registerUserDTO);
      }),
      switchMap((response) => {
        this.loaderService.hideLoader();
        if (isApiErrorResponse(response)) {
          return [registerUserFail({ error: response })];
        }
        return [registerUserSuccess({ registerUserResponse: response.data })];
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly loaderService: LoaderService,
    private readonly authService: AuthService
  ) {}
}
