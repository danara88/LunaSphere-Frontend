import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { marbles } from 'rxjs-marbles';
import { Store } from '@ngrx/store';

import { googleSignInFail, googleSignInRequested, googleSignInSuccess } from '../auth.actions';
import { AuthService } from '@/auth/services/auth.service';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { ApiDataResp, ApiErrorResp } from '@/shared/models/api-response.model';
import { AuthResponse } from '@/auth/auth.schema';
import { GoogleSignInRequestedEffect } from './google-sign-in-requested.effect';

describe('GoogleSignInRequestedEffect', () => {
  let actions$: ReplaySubject<any>;
  let mockStore: MockStore<any>;
  let effects: GoogleSignInRequestedEffect;
  let authService: AuthService;

  const mockAuthService = {
    googleSignIn$: () => of({}),
  };

  const mockLoaderService = {
    showLoader: jasmine.createSpy('showLoader'),
    hideLoader: jasmine.createSpy('hideLoader'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GoogleSignInRequestedEffect,
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
      ],
    }).compileComponents();

    actions$ = new ReplaySubject<any>();
    effects = TestBed.inject(GoogleSignInRequestedEffect);
    mockStore = TestBed.inject(Store) as MockStore<any>;
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    actions$.complete();
  });

  it(
    'should dispatch googleSignInSuccess',
    marbles((m) => {
      const mockResponse = {
        status: 200,
        data: {
          accessToken: 'xyz',
          refreshToken: 'xyz',
          userDetails: {
            id: 1,
            firstName: 'Test First Name',
            lastName: 'Test Name',
          },
        },
        success: true,
      } as ApiDataResp<AuthResponse>;
      const expected$ = m.cold('(a)', {
        a: googleSignInSuccess({ authResponse: mockResponse.data }),
      });
      spyOn(authService, 'googleSignIn$').and.returnValue(of(mockResponse));

      actions$.next(
        googleSignInRequested({
          googleSignInDTO: {
            token: 'xyz',
          },
        })
      );

      m.expect(effects.googleSignInRequested$).toBeObservable(expected$);
    })
  );

  it(
    'should dispatch googleSignInFail',
    marbles((m) => {
      const appError: ApiErrorResp = {
        detail: 'Error',
        title: 'error',
        status: 500,
        success: false,
      };
      spyOn(authService, 'googleSignIn$').and.returnValue(of(appError));
      const expected$ = m.cold('(a)', { a: googleSignInFail({ error: appError }) });

      actions$.next(
        googleSignInRequested({
          googleSignInDTO: {
            token: 'xyz',
          },
        })
      );

      m.expect(effects.googleSignInRequested$).toBeObservable(expected$);
    })
  );
});
