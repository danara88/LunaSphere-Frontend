import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs';

import { AuthService } from '@/auth/services/auth.service';
import {
  resendVerificationCodeFail,
  resendVerificationCodeRequested,
  resendVerificationCodeSuccess,
} from '../auth.actions';
import { LoaderService } from '@/shared/services/loader-service/loader.service';
import { LoaderTypeEnum } from '@/shared/components/luna-sphere-loader/models/luna-sphere-loader.model';
import { isApiErrorResponse } from '@/shared/utils/api-utils';
import { ToastNotificationService } from '@/shared/services/toast-notification-service/toast-notification.service';
import { ToastSeverity } from '@/shared/components/luna-sphere-toast-notification/models/luna-sphere-toast-notification.model';

@Injectable({
  providedIn: 'root',
})
export class ResendVerificationCodeRequestedEffect {
  readonly resendVerificationCodeRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resendVerificationCodeRequested),
      switchMap(({ verificationToken }) => {
        this._loaderService.showLoader({
          title: 'Sending...',
          detail: 'Please wait, we are sending a new verification code in this moment.',
          type: LoaderTypeEnum.MODAL_SCREEN,
        });
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

  readonly resendVerificationCodeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resendVerificationCodeSuccess),
        tap(() => {
          this._toastNotificationService.show({
            detail: 'We have sent a verification code to your email. Please check your inbox.',
            severity: ToastSeverity.SUCCESS,
          });
        })
      ),
    {
      dispatch: false,
    }
  );

  readonly resendVerificationCodeFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resendVerificationCodeFail),
        tap(({ error }) => {
          this._toastNotificationService.show({
            detail: error.detail,
            severity: ToastSeverity.ERRROR,
          });
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly _loaderService: LoaderService,
    private readonly _authService: AuthService,
    private readonly _toastNotificationService: ToastNotificationService
  ) {}
}
