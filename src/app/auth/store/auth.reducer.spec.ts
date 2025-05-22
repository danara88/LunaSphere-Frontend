import { ApiDataResp, ApiErrorResp, ApiStatus } from '@/shared/models';
import {
  googleSignInFail,
  googleSignInRequested,
  googleSignInSuccess,
  registerUserFail,
  registerUserRequested,
  registerUserSuccess,
} from './auth.actions';
import { authReducer, initialState } from './auth.reducer';
import { AuthResponse, RegisterUserResponse } from '../auth.schema';

describe('authReducer', () => {
  it('should return previous state', () => {
    const action = {} as any;

    const result = authReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  describe('register user', () => {
    it('should set auth state as loading when register user is requested', () => {
      const action = registerUserRequested({
        registerUserDTO: {
          email: 'test@test.com',
          password: 'Test_123!',
        },
      });

      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        callApiStatus: ApiStatus.LOADING,
        error: null,
      });
    });

    it('should set auth state as success when register user succeed', () => {
      const mockRegisterUserResponse = {
        verificationToken: 'xbc',
        verificationTokenExpires: '1bv1',
      } as RegisterUserResponse;

      const action = registerUserSuccess({ registerUserResponse: mockRegisterUserResponse });

      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        callApiStatus: ApiStatus.SUCCESS,
        error: null,
      });
    });

    it('should set auth state with errors when register user fails', () => {
      const mockApiErrorResp = {
        detail: 'Api error test',
        title: 'Test error',
        status: 500,
        success: false,
      } as ApiErrorResp;
      const action = registerUserFail({ error: mockApiErrorResp });

      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        user: null,
        callApiStatus: ApiStatus.FAIL,
        error: mockApiErrorResp,
      });
    });

    it('should set auth state as loading when google sign in is requested', () => {
      const action = googleSignInRequested({
        googleSignInDTO: {
          token: 'faketoken',
        },
      });

      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        callApiStatus: ApiStatus.LOADING,
        error: null,
      });
    });

    it('should set auth state with errors when google sign in fails', () => {
      const mockApiErrorResp = {
        detail: 'Api error test',
        title: 'Test error',
        status: 500,
        success: false,
      } as ApiErrorResp;
      const action = googleSignInFail({ error: mockApiErrorResp });

      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        user: null,
        callApiStatus: ApiStatus.FAIL,
        error: mockApiErrorResp,
      });
    });

    it('should set auth state as success when google sign in succeed', () => {
      const mockResponse = {
        status: 200,
        data: {
          accessToken: 'xyz',
          refreshToken: 'xyzo',
          userDetails: {
            id: 1,
            firstName: 'Test',
            lastName: 'Test',
          },
        },
        success: true,
      } as ApiDataResp<AuthResponse>;

      const action = googleSignInSuccess({ authResponse: mockResponse.data });

      const result = authReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        callApiStatus: ApiStatus.SUCCESS,
        user: mockResponse.data.userDetails,
        error: null,
      });
    });
  });
});
