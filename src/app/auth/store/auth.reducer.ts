import { createReducer, on } from '@ngrx/store';

import { ApiStatus } from '@/shared/models';
import { AuthState } from './auth.state';
import {
  accountVerificationFail,
  accountVerificationRequested,
  accountVerificationSuccess,
  googleSignInFail,
  googleSignInRequested,
  googleSignInSuccess,
  registerUserSuccess,
  registerUserFail,
  registerUserRequested,
  resendVerificationCodeRequested,
  resendVerificationCodeSuccess,
  resendVerificationCodeFail,
} from './auth.actions';

export const initialState: AuthState = {
  user: null,
  error: null,
  callApiStatus: ApiStatus.INACTIVE,
  accountVerification: {
    callApiStatus: ApiStatus.INACTIVE,
    error: null,
  },
  resendVerificationCode: {
    callApiStatus: ApiStatus.INACTIVE,
    error: null,
  },
};

export const authReducer = createReducer(
  initialState,
  on(registerUserRequested, (state) => ({
    ...state,
    callApiStatus: ApiStatus.LOADING,
    error: null,
  })),
  on(registerUserSuccess, (state) => ({
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
  })),
  on(accountVerificationRequested, (state) => ({
    ...state,
    accountVerification: {
      ...state.accountVerification,
      callApiStatus: ApiStatus.LOADING,
    },
  })),
  on(accountVerificationFail, (state, { error }) => ({
    ...state,
    accountVerification: {
      ...state.accountVerification,
      callApiStatus: ApiStatus.FAIL,
      error,
    },
  })),
  on(accountVerificationSuccess, (state, { authResponse }) => ({
    ...state,
    user: authResponse.userDetails,
    error: null,
    accountVerification: {
      ...state.accountVerification,
      callApiStatus: ApiStatus.SUCCESS,
      error: null,
    },
  })),
  on(resendVerificationCodeRequested, (state) => ({
    ...state,
    accountVerification: {
      ...state.accountVerification,
      error: null,
      callApiStatus: ApiStatus.INACTIVE,
    },
    resendVerificationCode: {
      ...state.resendVerificationCode,
      error: null,
      callApiStatus: ApiStatus.LOADING,
    },
  })),
  on(resendVerificationCodeSuccess, (state) => ({
    ...state,
    resendVerificationCode: {
      ...state.resendVerificationCode,
      error: null,
      callApiStatus: ApiStatus.SUCCESS,
    },
  })),
  on(resendVerificationCodeFail, (state, { error }) => ({
    ...state,
    resendVerificationCode: {
      ...state.resendVerificationCode,
      error,
      callApiStatus: ApiStatus.FAIL,
    },
  }))
);
