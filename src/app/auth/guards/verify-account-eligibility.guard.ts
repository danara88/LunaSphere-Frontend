import { inject } from '@angular/core';
import { CanMatchFn, UrlSegment } from '@angular/router';
import { take, map, of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { isApiErrorResponse } from '@/shared/utils/api-utils';
import { LoaderService } from '@/shared/services/loader-service/loader.service';
import { LoaderTypeEnum } from '@/shared/components/luna-sphere-loader/models/luna-sphere-loader.model';

export const VerifyAccountEligibilityGuard: CanMatchFn = (_, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const loaderService = inject(LoaderService);

  const verificationToken = segments[1]?.path;

  if (!verificationToken) return of(false);

  loaderService.showLoader({
    title: 'Account verification ...',
    detail: 'We are setting up yout account verification.',
    type: LoaderTypeEnum.MODAL_SCREEN,
  });

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
