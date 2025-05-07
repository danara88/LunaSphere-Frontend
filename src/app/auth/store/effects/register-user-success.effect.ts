import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { registerUserSuccess } from '../auth.actions';
import { routes } from '@/shared/constants/routes';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserSuccessdEffect {
  readonly registerUserRequested$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerUserSuccess),
        tap(({ registerUserResponse }) => {
          const verificationToken = registerUserResponse.verificationToken;
          this._router.navigate([routes.auth.verifyAccountPage, verificationToken]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly _router: Router
  ) {}
}
