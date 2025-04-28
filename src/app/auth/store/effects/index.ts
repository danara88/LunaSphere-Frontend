import { GoogleSignInRequestedEffect } from './google-sign-in-requested.effect';
import { GoogleSignInSuccessEffect } from './google-sign-in-success.effect';
import { RegisterUserRequestedEffect } from './register-user-requested.effect';

export const authEffects = [
  RegisterUserRequestedEffect,
  GoogleSignInRequestedEffect,
  GoogleSignInSuccessEffect,
];
