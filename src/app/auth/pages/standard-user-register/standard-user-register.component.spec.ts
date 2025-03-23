import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { StandardUserRegisterComponent } from './standard-user-register.component';
import { LunaSphereButtonComponent } from '@/shared/components/luna-sphere-button/luna-sphere-button.component';
import { LunaSphereFormControlComponent } from '@/shared/components/luna-sphere-form-control/luna-sphere-form-control.component';
import { GoogleService } from '@/auth/services/google.service';
import { registerUserRequested } from '@/auth/store';
import { RegisterUserDTO } from '@/auth/auth.schema';

describe('StandardUserRegisterComponent', () => {
  let component: StandardUserRegisterComponent;
  let fixture: ComponentFixture<StandardUserRegisterComponent>;
  let compiled: HTMLElement;
  let googleService: GoogleService;
  let mockStore: MockStore;

  const mockGoogleService = {
    initializeGoogleSignIn: jasmine.createSpy('initializeGoogleSignIn'),
    renderButton: jasmine.createSpy('renderButton'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StandardUserRegisterComponent,
        LunaSphereButtonComponent,
        LunaSphereFormControlComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore(),
        {
          provide: GoogleService,
          useValue: mockGoogleService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StandardUserRegisterComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    googleService = TestBed.inject(GoogleService);
    mockStore = TestBed.inject(MockStore);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('google sign in', () => {
    it('should initialize google sign in on ngOnInit', () => {
      component.ngOnInit();
      expect(googleService.initializeGoogleSignIn).toHaveBeenCalled();
    });

    it('should render sign in button on ngAfterViewInit', () => {
      const googleSignInBtnElement = compiled.querySelector('#google-sign-in-btn') as HTMLElement;
      component.ngAfterViewInit();
      expect(googleSignInBtnElement).toBeTruthy();
      expect(googleService.renderButton).toHaveBeenCalledWith(googleSignInBtnElement);
    });
  });

  describe('register form', () => {
    it('should create form with two fields', () => {
      const fields = Object.keys(component.registerForm.controls);
      expect(fields.length).toBe(2);
    });

    it('should create email and password fields', () => {
      const emailField = component.registerForm.controls['email'];
      const passwordField = component.registerForm.controls['password'];
      expect(emailField).toBeTruthy();
      expect(passwordField).toBeTruthy();
    });

    it('should mark all as touched when register form is invalid', () => {
      const spy = spyOn(mockStore, 'dispatch');
      component.registerForm.setErrors({ errors: true });
      component.onSubmit();
      expect(spy).not.toHaveBeenCalled();
      Object.values(component.registerForm.controls).forEach((control) => {
        expect(control.touched).toBeTrue();
      });
    });

    it('should dispatch register user action when register form is valid', () => {
      const expectedRegisterUserDTO: RegisterUserDTO = {
        email: 'test@test.com',
        password: 'Test_123!',
      };
      const spy = spyOn(mockStore, 'dispatch');
      component.registerForm.controls['email'].setValue('test@test.com');
      component.registerForm.controls['password'].setValue('Test_123!');
      component.onSubmit();
      expect(spy).toHaveBeenCalledWith(
        registerUserRequested({ registerUserDTO: expectedRegisterUserDTO })
      );
    });

    it('should display email error message when email field is has errors', () => {
      component.registerForm.controls['email'].setErrors({ requried: true });
      component.onSubmit();
      fixture.detectChanges();
      const errorMessageElement = compiled.querySelector('[data-testId="email-error-message"]');
      expect(errorMessageElement).toBeTruthy();
    });

    it('should not display email error message when email field is valid', () => {
      component.registerForm.controls['email'].setValue('test@test.com');
      component.onSubmit();
      fixture.detectChanges();
      const errorMessageElement = compiled.querySelector('[data-testId="email-error-message"]');
      expect(errorMessageElement).toBeFalsy();
    });

    it('should display password error message when password field is has errors', () => {
      component.registerForm.controls['password'].setErrors({ requried: true });
      component.onSubmit();
      fixture.detectChanges();
      const errorMessageElement = compiled.querySelector('[data-testId="password-error-message"]');
      expect(errorMessageElement).toBeTruthy();
    });

    it('should not display password error message when password field is valid', () => {
      component.registerForm.controls['password'].setValue('Test_123!');
      component.onSubmit();
      fixture.detectChanges();
      const errorMessageElement = compiled.querySelector('[data-testId="password-error-message"]');
      expect(errorMessageElement).toBeFalsy();
    });

    describe('email validation', () => {
      const emailTestCases = [
        {
          email: 'test',
          expected: false,
        },
        {
          email: 'test@test.com',
          expected: true,
        },
        {
          email: 'test@test',
          expected: false,
        },
        {
          email: 'test@',
          expected: false,
        },
        {
          email: '',
          expected: false,
        },
      ];

      emailTestCases.forEach(({ email, expected }) => {
        it(`should return ${expected} when email input value is ${email}`, () => {
          const field = component.registerForm.controls['email'];
          field.setValue(email);
          expect(field.valid).toBe(expected);
        });
      });
    });

    describe('password validation', () => {
      const passwordTestCases = [
        {
          password: 'Test',
          expected: false,
        },
        {
          password: 'Test_99999!',
          expected: true,
        },
        {
          password: '1212121',
          expected: false,
        },
        {
          password: 'Test_9999',
          expected: false,
        },
        {
          password: '',
          expected: false,
        },
      ];

      passwordTestCases.forEach(({ password, expected }) => {
        it(`should return ${expected} when password input value is ${password}`, () => {
          const field = component.registerForm.controls['password'];
          field.setValue(password);
          expect(field.valid).toBe(expected);
        });
      });
    });
  });
});
