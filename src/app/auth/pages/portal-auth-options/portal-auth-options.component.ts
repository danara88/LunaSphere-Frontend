import { AuthService } from '@/auth/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

enum AccountTypes {
  business = 'business-account',
  individual = 'individual-account',
}

declare const gapi: any;

@Component({
  selector: 'app-portal-auth-options',
  templateUrl: './portal-auth-options.component.html',
  styleUrl: './portal-auth-options.component.scss',
})
export class PortalAuthOptionsComponent implements OnInit {
  public accountType: AccountTypes = AccountTypes.business;
  public title: string = '';
  public subTitle: string = '';

  private activateRouter: ActivatedRoute = inject(ActivatedRoute);
  private authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.renderGoogleButton();
    this.activateRouter.params.pipe(take(1)).subscribe((params) => {
      const portalType = params['portal-type'];
      if (!portalType) return;

      if (portalType === AccountTypes.business) {
        this.accountType = AccountTypes.business;
        this.title = 'Business Portal';
        this.subTitle = 'Increase your business reach and optimize your reservation flow.';
        return;
      }

      if (portalType === AccountTypes.individual) {
        this.accountType = AccountTypes.individual;
        this.title = 'Individual Portal';
        this.subTitle = 'Search, reserve, enjoy!';
        return;
      }
    });
  }

  /**
   * @method renderGoogleButton
   * @description Render google sign in button
   */
  private renderGoogleButton() {
    gapi.signin2.render('google-sign-in-btn', {
      scope: 'profile email',
      height: 50,
      width: '100%',
      longtitle: true,
      theme: 'dark',
    });
    this.startGoogleAuth2();
  }

  private async startGoogleAuth2() {
    await this.authService.googleInit();
    this.attachSignin(document.getElementById('google-sign-in-btn')!);
  }

  private attachSignin(element: HTMLElement) {
    this.authService.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        var id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        // Login by Google
        // this.userService.loginGoogle(id_token).subscribe((resp) => {
        //   // NgZone es utilizado por que el control de la redirección la tiene google y no Angular
        //   this.ngZone.run(() => {
        //     // Redirect to dashboard
        //     this.router.navigateByUrl('/');
        //   });
        // });
      },
      function (error: any) {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
