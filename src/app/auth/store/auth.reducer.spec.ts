import { ApiErrorResp, ApiStatus } from '@/shared/models';
import { registerlUserSuccess, registerUserFail, registerUserRequested } from './auth.actions';
import { authReducer, initialState } from './auth.reducer';

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
      const action = registerlUserSuccess();

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
  });
});
