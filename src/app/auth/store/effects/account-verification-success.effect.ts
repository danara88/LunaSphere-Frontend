import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { accountVerificationSuccess } from '../auth.actions';
import { routes } from '@/shared/constants/routes';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationSuccessdEffect {
  readonly accountVerificationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountVerificationSuccess),
        tap(() => {
          this._router.navigate([routes.reservations.startPage]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly _router: Router
  ) {}
}
