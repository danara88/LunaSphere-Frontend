import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';

import { AuthService } from '@/auth/services/auth.service';
import { registerUserSuccess, registerUserFail, registerUserRequested } from '../auth.actions';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { LoaderConfig } from '@/auth/components/loader/models/loader.model';
import { SpinnerTypeEnum } from '@/shared/components/luna-sphere-spinner/models/luna-sphere-spinner.model';
import { isApiErrorResponse } from '@/shared/utils/api-utils';

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
  ) {
    const loaderConfig: LoaderConfig = {
      title: 'Verifying...',
      description: 'Please wait, we are processing your account.',
      spinnerType: SpinnerTypeEnum.DEFAULT,
    };
    this.loaderService.loaderConfig = loaderConfig;
  }
}
