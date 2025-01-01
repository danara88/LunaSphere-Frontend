import { GoogleService } from '@/auth/services/google.service';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

enum AccountTypes {
  business = 'business-account',
  individual = 'individual-account',
}

@Component({
  selector: 'app-portal-auth-options',
  templateUrl: './portal-auth-options.component.html',
  styleUrl: './portal-auth-options.component.scss',
})
export class PortalAuthOptionsComponent implements OnInit, AfterViewInit {
  public accountType: AccountTypes = AccountTypes.business;
  public title: string = '';
  public subTitle: string = '';

  private activateRouter: ActivatedRoute = inject(ActivatedRoute);
  public googleService: GoogleService = inject(GoogleService);

  ngOnInit(): void {
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
        this.googleService.initializeGoogleSignIn();
        this.accountType = AccountTypes.individual;
        this.title = 'Individual Portal';
        this.subTitle = 'Search, reserve, enjoy!';

        return;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.accountType === AccountTypes.business) return;
    this.googleService.renderButton(document.getElementById('google-sign-in-btn')!);
  }
}
