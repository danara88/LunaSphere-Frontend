import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

import { googleSignInSuccess } from '../auth.actions';
import { routes } from '@/shared/constants/routes';

@Injectable({
  providedIn: 'root',
})
export class GoogleSignInSuccessEffect {
  readonly googleSignInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(googleSignInSuccess),
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
