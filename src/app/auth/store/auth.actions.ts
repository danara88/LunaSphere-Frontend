import { createAction, props } from '@ngrx/store';

import { ApiErrorResp } from '@/shared/models';
import {
  AuthResponse,
  GoogleSignInDTO,
  RegisterUserDTO,
  RegisterUserResponse,
  VerifyVerificationCodeRequest,
} from '../auth.schema';

export const registerUserRequested = createAction(
  '[Auth] Register user requested',
  props<{ registerUserDTO: RegisterUserDTO }>()
);

export const registerUserSuccess = createAction(
  '[Auth] Register user success',
  props<{ registerUserResponse: RegisterUserResponse }>()
);

export const registerUserFail = createAction(
  '[Auth] Register user fail',
  props<{ error: ApiErrorResp }>()
);

export const googleSignInRequested = createAction(
  '[Auth] Google sign in requested',
  props<{ googleSignInDTO: GoogleSignInDTO }>()
);

export const googleSignInSuccess = createAction(
  '[Auth] Google sign in success',
  props<{ authResponse: AuthResponse }>()
);

export const googleSignInFail = createAction(
  '[Auth] Google sign in fail',
  props<{ error: ApiErrorResp }>()
);

export const accountVerificationRequested = createAction(
  '[Auth] Account verification requested',
  props<{ verifyVerificationCodeRequest: VerifyVerificationCodeRequest }>()
);

export const accountVerificationFail = createAction(
  '[Auth] Account verification fail',
  props<{ error: ApiErrorResp }>()
);

export const accountVerificationSuccess = createAction(
  '[Auth] Account verification success',
  props<{ authResponse: AuthResponse }>()
);

export const resendVerificationCodeRequested = createAction(
  '[Auth] Resend verification code requested',
  props<{ verificationToken: string }>()
);

export const resendVerificationCodeFail = createAction(
  '[Auth] Resend verification code fail',
  props<{ error: ApiErrorResp }>()
);

export const resendVerificationCodeSuccess = createAction(
  '[Auth] Resend verification code success'
);
