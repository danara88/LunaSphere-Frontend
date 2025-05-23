import { TestBed } from '@angular/core/testing';
import { UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { VerifyAccountEligibilityGuard } from './verify-account-eligibility.guard';
import { ApiErrorResp, ApiMessageResp } from '@/shared/models';

describe('VerifyAccountEligibilityGuard', () => {
  let authService: AuthService;
  let loaderService: LoaderService;

  const mockAuthService = {
    eligibleForAccountVerification$: () => of({}),
  };

  const mockLoaderService = {
    showLoader: jasmine.createSpy('showLoader'),
    hideLoader: jasmine.createSpy('hideLoader'),
  };

  const mockAppError: ApiErrorResp = {
    detail: 'Error',
    title: 'error',
    status: 500,
    success: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: LoaderService,
          useValue: mockLoaderService,
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    loaderService = TestBed.inject(LoaderService);
  });

  it('should return true when user is eligible for account verification', (done) => {
    const mockApiResponse = {} as ApiMessageResp;
    spyOn(authService, 'eligibleForAccountVerification$').and.returnValue(of(mockApiResponse));
    const segments = [new UrlSegment('verificationToken', {}), new UrlSegment('xyz', {})];
    const guard = TestBed.runInInjectionContext(() => {
      return VerifyAccountEligibilityGuard({}, segments) as Observable<boolean>;
    });
    guard.subscribe((resp) => {
      expect(resp).toBeTrue();
      expect(loaderService.showLoader).toHaveBeenCalled();
      expect(loaderService.hideLoader).toHaveBeenCalled();
      expect(authService.eligibleForAccountVerification$).toHaveBeenCalledWith('xyz');
      done();
    });
  });

  it('should return false when user is not eligible for account verification', (done) => {
    spyOn(authService, 'eligibleForAccountVerification$').and.returnValue(of(mockAppError));
    const segments = [new UrlSegment('verificationToken', {}), new UrlSegment('xyz', {})];
    const guard = TestBed.runInInjectionContext(() => {
      return VerifyAccountEligibilityGuard({}, segments) as Observable<boolean>;
    });
    guard.subscribe((resp) => {
      expect(loaderService.showLoader).toHaveBeenCalled();
      expect(loaderService.hideLoader).toHaveBeenCalled();
      expect(resp).toBeFalse();
      done();
    });
  });

  it('should return false when verification token parameter is not present in the path', (done) => {
    const segments = [new UrlSegment('verificationToken', {})];
    const guard = TestBed.runInInjectionContext(() => {
      return VerifyAccountEligibilityGuard({}, segments) as Observable<boolean>;
    });
    guard.subscribe((resp) => {
      // TODO: When laoderService is fixed, add two more expectations to verify show/hide methods are not called here.
      expect(resp).toBeFalse();
      done();
    });
  });
});
