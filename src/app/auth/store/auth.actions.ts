import { createAction, props } from '@ngrx/store';

import { ApiErrorResp } from '@/shared/models';
import { AuthResponse, GoogleSignInDTO, RegisterUserDTO } from '../auth.schema';

export const registerUserRequested = createAction(
  '[Auth] Register user requested',
  props<{ registerUserDTO: RegisterUserDTO }>()
);

export const registerlUserSuccess = createAction('[Auth] Register user success');

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
