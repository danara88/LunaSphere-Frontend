import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';

import { googleSignInRequested } from '../store';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  private readonly _store = inject(Store);

  constructor() {}

  private handleCredentialResponse(response: any) {
    const { credential: token } = response;
    this._store.dispatch(
      googleSignInRequested({
        googleSignInDTO: {
          token,
        },
      })
    );
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
    });

    google.accounts.id.prompt();
  }

  renderButton(element: HTMLElement) {
    google.accounts.id.renderButton(element, {
      size: 'large',
      width: 350,
    });
  }

  triggerGoogleSignIn() {
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.warn('Google Sign-in aborted or not shown.');
      } else {
        console.log('Google Sign-in successful');
      }
    });
  }
}
