import { Injectable } from '@angular/core';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public auth2: any;

  constructor() {
    this.googleInit();
  }

  /**
   * @method googleInit
   * @description Initialize auth2 with google
   */
  googleInit(): Promise<any> {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '480006497582-nqs3bufai5ka7gvs7pgdruvmn4oggcd8.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve(true);
      });
    });
  }
}
