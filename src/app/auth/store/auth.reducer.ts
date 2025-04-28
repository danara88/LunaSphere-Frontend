import { createReducer, on } from '@ngrx/store';

import { ApiStatus } from '@/shared/models';
import { AuthState } from './auth.state';
import {
  googleSignInFail,
  googleSignInRequested,
  googleSignInSuccess,
  registerlUserSuccess,
  registerUserFail,
  registerUserRequested,
} from './auth.actions';

export const initialState: AuthState = {
  user: null,
  error: null,
  callApiStatus: ApiStatus.INACTIVE,
};

export const authReducer = createReducer(
  initialState,
  on(registerUserRequested, (state) => ({
    ...state,
    callApiStatus: ApiStatus.LOADING,
    error: null,
  })),
  on(registerlUserSuccess, (state) => ({
    ...state,
    callApiStatus: ApiStatus.SUCCESS,
    error: null,
  })),
  on(registerUserFail, (state, { error }) => ({
    ...state,
    user: null,
    callApiStatus: ApiStatus.FAIL,
    error,
  })),
  on(googleSignInRequested, (state) => ({
    ...state,
    callApiStatus: ApiStatus.LOADING,
    error: null,
  })),
  on(googleSignInSuccess, (state, { authResponse }) => ({
    ...state,
    user: authResponse.userDetails,
    callApiStatus: ApiStatus.SUCCESS,
    error: null,
  })),
  on(googleSignInFail, (state, { error }) => ({
    ...state,
    user: null,
    callApiStatus: ApiStatus.FAIL,
    error,
  }))
);
