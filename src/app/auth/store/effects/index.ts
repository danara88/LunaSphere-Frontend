import { AccountVerificationRequestedEffect } from './account-verification-requested.effect';
import { AccountVerificationSuccessdEffect } from './account-verification-success.effect';
import { GoogleSignInRequestedEffect } from './google-sign-in-requested.effect';
import { GoogleSignInSuccessEffect } from './google-sign-in-success.effect';
import { RegisterUserRequestedEffect } from './register-user-requested.effect';
import { RegisterUserSuccessdEffect } from './register-user-success.effect';
import { ResendVerificationCodeRequestedEffect } from './resend-verification-code-requested.effect';

export const authEffects = [
  RegisterUserRequestedEffect,
  GoogleSignInRequestedEffect,
  GoogleSignInSuccessEffect,
  AccountVerificationRequestedEffect,
  RegisterUserSuccessdEffect,
  AccountVerificationSuccessdEffect,
  ResendVerificationCodeRequestedEffect,
];
