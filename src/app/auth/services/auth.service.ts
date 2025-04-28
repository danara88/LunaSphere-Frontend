import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ApiDataResp, ApiErrorResp, ApiMessageResp } from '@/shared/models';
import {
  AuthResponse,
  GoogleSignInDTO,
  RegisterUserDTO,
  RegisterUserResponse,
  RoleType,
  User,
  VerifyVerificationCodeRequest,
} from '../auth.schema';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly _registerUseV1 = '/api/v1/auth/register';
  private readonly _googleSignInV1 = '/api/v1/auth/google-signin';

  registerUser$(
    registerUserDTO: RegisterUserDTO
  ): Observable<ApiDataResp<RegisterUserResponse> | ApiErrorResp> {
    return this._http
      .post<
        ApiDataResp<RegisterUserResponse>
      >(`${environment.baseApiUrl}${this._registerUseV1}`, registerUserDTO)
      .pipe(
        map((resp) => resp),
        catchError((error) => of(this.mapToAuthErrorResponse(error)))
      );
  }

  googleSignIn$(
    googleSignInDTO: GoogleSignInDTO
  ): Observable<ApiDataResp<AuthResponse> | ApiErrorResp> {
    return this._http
      .post<
        ApiDataResp<AuthResponse>
      >(`${environment.baseApiUrl}${this._googleSignInV1}`, googleSignInDTO)
      .pipe(
        map((resp) => resp),
        catchError((error) => of(this.mapToAuthErrorResponse(error)))
      );
  }

  verifyVerificationCode$(
    verifyVerificationCodeRequest: VerifyVerificationCodeRequest
  ): Observable<ApiDataResp<AuthResponse> | ApiErrorResp> {
    return this._http
      .post<
        ApiDataResp<AuthResponse>
      >(`${environment.baseApiUrl}${this._registerUseV1}`, verifyVerificationCodeRequest)
      .pipe(
        map((resp) => resp),
        catchError((error) => of(this.mapToAuthErrorResponse(error)))
      );
  }

  // TODO: Use this mapper to transform the data
  private mapToAuthResponse(resp: any): AuthResponse<User> {
    return {
      accessToken: resp.data.accessToken,
      refreshToken: resp.data.refreshToken,
      userDetails: {
        ...resp.data.userDetails,
        role: this.getRoleName(resp.data.userDetails.role),
      },
    };
  }

  private getRoleName(roleType: RoleType): string {
    switch (roleType) {
      case RoleType.STANDARD:
        return 'standard';
      case RoleType.BUSINESS:
        return 'business';
    }
  }

  private mapToAuthErrorResponse(error: any): ApiErrorResp {
    const errorObj = error.error;
    const errorResponse: ApiErrorResp = {
      detail: errorObj.detail,
      title: errorObj.title,
      status: errorObj.status,
      success: false,
    };
    return errorResponse;
  }

  // TODO: Use this mapper to transform the data
  private mapToAuthMessageResp(resp: any): ApiMessageResp {
    return {
      message: resp.message,
      status: resp.status,
      success: true,
    };
  }
}
