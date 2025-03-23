import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { marbles } from 'rxjs-marbles';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { RegisterUserRequestedEffect } from './register-user-requested.effect';
import { registerlUserSuccess, registerUserFail, registerUserRequested } from '../auth.actions';
import { AuthService } from '@/auth/services/auth.service';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { ApiErrorResp } from '@/shared/models/api-response.model';

describe('RegisterUserRequestedEffect', () => {
  let actions$: ReplaySubject<any>;
  let mockStore: MockStore<any>;
  let effects: RegisterUserRequestedEffect;
  let authService: AuthService;
  let router: Router;

  const mockAuthService = {
    registerUser$: () => of({}),
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockLoaderService = {
    showLoader: jasmine.createSpy('showLoader'),
    hideLoader: jasmine.createSpy('hideLoader'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        RegisterUserRequestedEffect,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: LoaderService,
          useValue: mockLoaderService,
        },
      ],
    }).compileComponents();

    actions$ = new ReplaySubject<any>();
    effects = TestBed.inject(RegisterUserRequestedEffect);
    mockStore = TestBed.inject(Store) as MockStore<any>;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    actions$.complete();
  });

  it(
    'should dispatch registerlUserSuccess',
    marbles((m) => {
      const expected$ = m.cold('(a)', { a: registerlUserSuccess() });
      spyOn(authService, 'registerUser$').and.returnValue(
        of({
          message: 'Test',
          status: 200,
          success: true,
        })
      );

      actions$.next(
        registerUserRequested({
          registerUserDTO: {
            email: 'test@test.com',
            password: 'Test_123!',
          },
        })
      );

      m.expect(effects.registerUserRequested$).toBeObservable(expected$);
    })
  );

  it(
    'should dispatch registerUserFail',
    marbles((m) => {
      const appError: ApiErrorResp = {
        detail: 'Error',
        title: 'error',
        status: 500,
        success: false,
      };
      spyOn(authService, 'registerUser$').and.returnValue(of(appError));
      const expected$ = m.cold('(a)', { a: registerUserFail({ error: appError }) });

      actions$.next(
        registerUserRequested({
          registerUserDTO: {
            email: 'test@test.com',
            password: 'Test_123!',
          },
        })
      );

      m.expect(effects.registerUserRequested$).toBeObservable(expected$);
    })
  );
});
