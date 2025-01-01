import { Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  private clientId: string =
    '480006497582-nqs3bufai5ka7gvs7pgdruvmn4oggcd8.apps.googleusercontent.com';

  constructor() {}

  private handleCredentialResponse(response: any) {
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
      text: 'continue_with',
      size: 'large',
    });
  }

  triggerGoogleSignIn() {
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Try manual rendering
        google.accounts.id.renderButton(document.getElementById('googleLoginButton'), {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
        });
      }
    });
  }
}
