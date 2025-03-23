import { Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  // TODO: Move this value to an env file
  private clientId: string =
    '480006497582-nqs3bufai5ka7gvs7pgdruvmn4oggcd8.apps.googleusercontent.com';

  constructor() {}

  private handleCredentialResponse(response: any) {
    // TODO: Call API to verify google JWT token (Integration pending)
    const { credential: token } = response;
    console.log({ token });
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: this.clientId,
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
