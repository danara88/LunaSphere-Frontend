import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { ApiErrorResp, ApiMessageResp } from '@/shared/models';
import { AuthResponse, RegisterUserDTO, RoleType, User } from '../auth.schema';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly _registerUseV1 = '/api/v1/auth/register';

  registerUser$(registerUserDTO: RegisterUserDTO): Observable<ApiMessageResp | ApiErrorResp> {
    return this._http
      .post<ApiMessageResp>(`${environment.baseApiUrl}${this._registerUseV1}`, registerUserDTO)
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
