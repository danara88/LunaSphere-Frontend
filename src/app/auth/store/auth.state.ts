import { ApiStatus, ApiErrorResp } from '@/shared/models';
import { User } from '../auth.schema';

export interface AuthState {
  user: User | null;
  error: ApiErrorResp | null;
  callApiStatus: ApiStatus;
  accountVerification: {
    callApiStatus: ApiStatus;
    error: ApiErrorResp | null;
  };
  resendVerificationCode: {
    callApiStatus: ApiStatus;
    error: ApiErrorResp | null;
  };
}
