import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { RegisterUserDTO, RegisterUserResponse } from '../auth.schema';
import { ApiDataResp, ApiMessageResp } from '@/shared/models';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let mockHttp: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    service = TestBed.inject(AuthService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    mockHttp.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get correct register user response', () => {
    const mockRegisterDTO = {
      email: 'test@test.com',
      password: 'fakepassword',
    } as RegisterUserDTO;

    const mockResponse = {
      status: 200,
      data: {
        verificationToken: 'xyz',
        verificationTokenExpires: 'xyz',
      },
      success: true,
    } as ApiDataResp<RegisterUserResponse>;

    // `firstValueFrom` subscribes to the `Observable`, which makes the HTTP request,
    // and creates a `Promise` of the response
    const result = firstValueFrom(service.registerUser$(mockRegisterDTO));

    // At this point, the request is pending, and we can assert it was made
    // via the `HttpTestingController`:
    const req = mockHttp.expectOne(`${environment.baseApiUrl}/api/v1/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRegisterDTO);

    // Flushing the request causes it to complete, delivering the result.
    req.flush(mockResponse);

    result.then((resp) => {
      expect(resp).toEqual(mockResponse);
    });
  });

  it('should get errors when register user fails', (done) => {
    const mockError = {
      detail: 'Test detail erorr',
      title: 'Test title error',
      status: 500,
      success: false,
    };
    const result = firstValueFrom(
      service.registerUser$({
        email: 'test@test.com',
        password: 'fakepassword',
      })
    );
    const req = mockHttp.expectOne(`${environment.baseApiUrl}/api/v1/auth/register`);

    req.flush(mockError);
    result.then((resp) => {
      expect(resp).toEqual({
        detail: mockError.detail,
        title: mockError.title,
        status: mockError.status,
        success: false,
      });
      done();
    });
  });
});
