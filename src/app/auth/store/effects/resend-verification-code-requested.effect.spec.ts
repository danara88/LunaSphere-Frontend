import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { marbles } from 'rxjs-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import { of, ReplaySubject } from 'rxjs';

import { ResendVerificationCodeRequestedEffect } from './resend-verification-code-requested.effect';
import { AuthService } from '@/auth/services/auth.service';
import { LoaderService } from '@/shared/services/loader-service/loader.service';
import { ToastNotificationService } from '@/shared/services/toast-notification-service/toast-notification.service';
import {
  resendVerificationCodeFail,
  resendVerificationCodeRequested,
  resendVerificationCodeSuccess,
} from '../auth.actions';
import { ApiErrorResp, ApiMessageResp } from '@/shared/models';
import { ToastSeverity } from '@/shared/components/luna-sphere-toast-notification/models/luna-sphere-toast-notification.model';

describe('ResendVerificationCodeRequestedEffect', () => {
  let actions$: ReplaySubject<any>;
  let effects: ResendVerificationCodeRequestedEffect;
  let authService: AuthService;
  let loaderService: LoaderService;
  let toastNotificationService: ToastNotificationService;

  const mockAuthService = {
    resendVerificationCode$: () => of({}),
  };

  const mockLoaderService = {
    showLoader: jasmine.createSpy('showLoader'),
    hideLoader: jasmine.createSpy('hideLoader'),
  };

  const mockToastNotificationService = {
    show: jasmine.createSpy('show'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ResendVerificationCodeRequestedEffect,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: LoaderService,
          useValue: mockLoaderService,
        },
        {
          provide: ToastNotificationService,
          useValue: mockToastNotificationService,
        },
      ],
    });

    actions$ = new ReplaySubject<any>();
    effects = TestBed.inject(ResendVerificationCodeRequestedEffect);
    authService = TestBed.inject(AuthService);
    loaderService = TestBed.inject(LoaderService);
    toastNotificationService = TestBed.inject(ToastNotificationService);
  });

  afterEach(() => {
    actions$.complete();
  });

  describe('resendVerificationCodeRequested$', () => {
    it(
      'should dispatch resendVerificationCodeSuccess when re-send verification succeed',
      marbles((m) => {
        const mockResponse = {
          message: 'Success message',
          status: 200,
          success: true,
        } as ApiMessageResp;

        const expected$ = m.cold('(a)', {
          a: resendVerificationCodeSuccess(),
        });

        spyOn(authService, 'resendVerificationCode$').and.returnValue(of(mockResponse));

        actions$.next(
          resendVerificationCodeRequested({
            verificationToken: 'xyzfaketoken',
          })
        );

        m.expect(effects.resendVerificationCodeRequested$).toBeObservable(expected$);
      })
    );

    it('should show and hide loader', () => {
      const mockResponse = {
        message: 'Success message',
        status: 200,
        success: true,
      } as ApiMessageResp;

      spyOn(authService, 'resendVerificationCode$').and.returnValue(of(mockResponse));

      actions$.next(
        resendVerificationCodeRequested({
          verificationToken: 'xyzfaketoken',
        })
      );

      effects.resendVerificationCodeRequested$.subscribe(() => {
        expect(loaderService.showLoader).toHaveBeenCalled();
        expect(loaderService.hideLoader).toHaveBeenCalled();
      });
    });

    it(
      'should dispatch resendVerificationCodeFail when re-send verification fails',
      marbles((m) => {
        const appError: ApiErrorResp = {
          detail: 'Error',
          title: 'error',
          status: 500,
          success: false,
        };

        const expected$ = m.cold('(a)', {
          a: resendVerificationCodeFail({ error: appError }),
        });

        spyOn(authService, 'resendVerificationCode$').and.returnValue(of(appError));

        actions$.next(
          resendVerificationCodeRequested({
            verificationToken: 'xyzfaketoken',
          })
        );

        m.expect(effects.resendVerificationCodeRequested$).toBeObservable(expected$);
      })
    );
  });

  describe('resendVerificationCodeSuccess$', () => {
    it('should show toast notification with success as severity', () => {
      actions$.next(resendVerificationCodeSuccess());

      effects.resendVerificationCodeSuccess$.subscribe(() => {
        expect(toastNotificationService.show).toHaveBeenCalledWith({
          detail: 'We have sent a verification code to your email. Please check your inbox.',
          severity: ToastSeverity.SUCCESS,
        });
      });
    });
  });

  describe('resendVerificationCodeFail$', () => {
    it('should show toast notification with error as severity', () => {
      const appError: ApiErrorResp = {
        detail: 'Error',
        title: 'error',
        status: 500,
        success: false,
      };
      actions$.next(resendVerificationCodeFail({ error: appError }));

      effects.resendVerificationCodeFail$.subscribe(() => {
        expect(toastNotificationService.show).toHaveBeenCalledWith({
          detail: appError.detail,
          severity: ToastSeverity.ERRROR,
        });
      });
    });
  });
});
