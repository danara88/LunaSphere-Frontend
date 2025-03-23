import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GoogleService } from '@/auth/services/google.service';
import { ButtonVariantEnum } from '@/shared/components/luna-sphere-button/models/luna-sphere-button.model';
import { AccountType } from '@/auth/auth.schema';

@Component({
  selector: 'app-portal-auth-options',
  templateUrl: './portal-auth-options.component.html',
  styleUrl: './portal-auth-options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalAuthOptionsComponent implements OnInit, AfterViewInit {
  private _title = '';
  private _subTitle = '';

  readonly buttonVariantEnum = ButtonVariantEnum;
  readonly accountTypeEnum = AccountType;

  private readonly _router = inject(Router);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _googleService: GoogleService = inject(GoogleService);
  private _portal: AccountType = AccountType.individual;

  get portal(): AccountType {
    return this._portal;
  }

  get title(): string {
    return this._title;
  }

  get subTitle(): string {
    return this._subTitle;
  }

  ngOnInit(): void {
    this._portal = this._validatePortalParam(this._activatedRoute.snapshot.params['portal']);

    if (!this._portal) return;

    if (this._portal === AccountType.business) {
      this._title = 'Business Portal';
      this._subTitle = 'Increase your business reach and optimize your reservation flow.';
      return;
    }

    if (this._portal === AccountType.individual) {
      this._googleService.initializeGoogleSignIn();
      this._title = 'Individual Portal';
      this._subTitle = 'Search, reserve, enjoy!';
      return;
    }
  }

  ngAfterViewInit(): void {
    if (this._portal === AccountType.business) return;
    this._googleService.renderButton(document.getElementById('google-sign-in-btn')!);
  }

  registerRedirect(): void {
    if (this._portal === AccountType.individual) {
      this._router.navigate(['/auth/register-individual']);
      return;
    }
  }

  triggerGoogleSignIn(): void {
    this._googleService.triggerGoogleSignIn();
  }

  private _validatePortalParam(value: string): AccountType {
    if (!Object.values(AccountType).includes(value as AccountType)) {
      this._router.navigate(['/auth']);
    }
    return value as AccountType;
  }
}
