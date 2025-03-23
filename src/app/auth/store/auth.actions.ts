import { createAction, props } from '@ngrx/store';

import { ApiErrorResp } from '@/shared/models';
import { RegisterUserDTO } from '../auth.schema';

export const registerUserRequested = createAction(
  '[Auth] Register user requested',
  props<{ registerUserDTO: RegisterUserDTO }>()
);

export const registerlUserSuccess = createAction('[Auth] Register user success');

export const registerUserFail = createAction(
  '[Auth] Register user fail',
  props<{ error: ApiErrorResp }>()
);
