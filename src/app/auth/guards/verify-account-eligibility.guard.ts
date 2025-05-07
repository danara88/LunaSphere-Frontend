import { inject } from '@angular/core';
import { CanMatchFn, UrlSegment } from '@angular/router';
import { take, map } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { isApiErrorResponse } from '@/shared/utils/api-utils';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { SpinnerTypeEnum } from '@/shared/components/luna-sphere-spinner/models/luna-sphere-spinner.model';

export const VerifyAccountEligibilityGuard: CanMatchFn = (_, segments: UrlSegment[]) => {
  console.log('Executing VerifyAccountEligibilityGuard');
  const authService = inject(AuthService);
  const loaderService = inject(LoaderService);

  loaderService.loaderConfig = {
    title: 'Account verification...',
    description: 'We are setting up yout account verification.',
    spinnerType: SpinnerTypeEnum.DEFAULT,
  };

  const verificationToken = segments[1].path;

  if (!verificationToken) return false;

  loaderService.showLoader();

  return authService.eligibleForAccountVerification$(verificationToken).pipe(
    take(1),
    map((resp) => {
      loaderService.hideLoader();
      if (isApiErrorResponse(resp)) {
        return false;
      }
      return true;
    })
  );
};
