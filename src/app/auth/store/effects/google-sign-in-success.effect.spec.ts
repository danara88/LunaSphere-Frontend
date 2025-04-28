import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';

import { googleSignInSuccess } from '../auth.actions';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { GoogleSignInSuccessEffect } from './google-sign-in-success.effect';
import { Router } from '@angular/router';
import { ApiDataResp } from '@/shared/models';
import { AuthResponse } from '@/auth/auth.schema';
import { routes } from '@/shared/constants/routes';

describe('GoogleSignInSuccessEffect', () => {
  let actions$: ReplaySubject<any>;
  let mockStore: MockStore<any>;
  let effects: GoogleSignInSuccessEffect;
  let router: Router;

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
        GoogleSignInSuccessEffect,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: LoaderService,
          useValue: mockLoaderService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();

    actions$ = new ReplaySubject<any>();
    effects = TestBed.inject(GoogleSignInSuccessEffect);
    mockStore = TestBed.inject(Store) as MockStore<any>;
    router = TestBed.inject(Router);
  });

  it('should redirect to reservation page', (done) => {
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

    actions$.next(
      googleSignInSuccess({
        authResponse: mockResponse.data,
      })
    );

    effects.googleSignInSuccess$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith([routes.reservations.startPage]);
      done();
    });
  });
});
