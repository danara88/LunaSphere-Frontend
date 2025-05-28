import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { AccountVerificationComponent } from './account-verification.component';
import { LunaSphereInputNumberComponent } from '@/shared/components/luna-sphere-input-number/luna-sphere-input-number.component';
import { LunaSphereButtonComponent } from '@/shared/components/luna-sphere-button/luna-sphere-button.component';
import { accountVerificationRequested, resendVerificationCodeRequested } from '@/auth/store';

describe('AccountVerificationComponent', () => {
  let fixture: ComponentFixture<AccountVerificationComponent>;
  let component: AccountVerificationComponent;
  let compiled: HTMLElement;
  let mockStore: MockStore;
  let activatedRoute: ActivatedRoute;

  const mockActivatedRoute = {
    snapshot: {
      params: {
        verificationToken: 'fakeverificatioken123',
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AccountVerificationComponent,
        LunaSphereInputNumberComponent,
        LunaSphereButtonComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountVerificationComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    mockStore = TestBed.inject(MockStore);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Verification code form', () => {
    it('should create form with correct number of fields', () => {
      const expectedFields = 4;
      const fields = Object.keys(component.verifyCodesForm.controls).length;
      const elements = compiled.querySelectorAll('[data-testid="digit-input-number"]');
      expect(fields).toBe(expectedFields);
      expect(elements.length).toBe(expectedFields);
    });

    it('should contain correct control validators', () => {
      const fields = ['digit1', 'digit2', 'digit3', 'digit4'];
      fields.forEach((field) => {
        const validator = component.verifyCodesForm.controls[field].hasValidator(
          Validators.required
        );
        expect(validator).toBeTrue();
      });
    });
  });

  describe('Resend verification code functionality', () => {
    it(`should dispatch 'accountVerificationRequested' with correct payload when all digits are filled`, () => {
      spyOn(mockStore, 'dispatch');
      activatedRoute.snapshot.params['verificationToken'] = 'XYZ';
      component.ngOnInit();
      const fields = ['digit1', 'digit2', 'digit3', 'digit4'];
      fields.forEach((field) => {
        component.verifyCodesForm.controls[field].setValue(1);
      });
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        accountVerificationRequested({
          verifyVerificationCodeRequest: {
            verificationCode: 1111,
            userEligibleForVerification: {
              encrytedVerificationToken: 'XYZ',
            },
          },
        })
      );
    });

    it(`should not dispatch 'accountVerificationRequested' when all digits are not filled`, () => {
      spyOn(mockStore, 'dispatch');
      activatedRoute.snapshot.params['verificationToken'] = 'XYZ';
      component.ngOnInit();

      // Establish values to all form fields, except digit4
      const fields = ['digit1', 'digit2', 'digit3'];

      fields.forEach((field) => {
        component.verifyCodesForm.controls[field].setValue(1);
      });
      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('Focus input number functionality', () => {
    it('should focus first input field on ngOnInit', () => {
      const inputNumberElements = compiled.querySelectorAll('[data-testid="digit-input-number"]');
      component.ngOnInit();
      expect(document.activeElement).toEqual(inputNumberElements[0].querySelector('input'));
    });

    it('should call handleInputChange on input number change', () => {
      spyOn(component, 'handleInputChange');
      const inputNumberElements = fixture.debugElement.queryAll(
        By.css('[data-testid="digit-input-number"]')
      );
      inputNumberElements[0].triggerEventHandler('onInputNumberChange', null);

      component.handleInputChange();
      fixture.detectChanges();

      expect(component.handleInputChange).toHaveBeenCalled();
    });
  });

  describe('Re-send verification code functionality', () => {
    it(`should dispatch 'resendVerificationCodeRequested' with correct payload when count down is 0`, () => {
      spyOn(mockStore, 'dispatch');
      spyOn(component, 'countDown').and.returnValue(0);

      // Establish value for verificationToken
      activatedRoute.snapshot.params['verificationToken'] = 'XYZ';
      component.ngOnInit();

      component.resendVerificationCode();
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        resendVerificationCodeRequested({ verificationToken: 'XYZ' })
      );
    });

    it(`should not dispatch 'resendVerificationCodeRequested' when count down is different than 0`, () => {
      spyOn(mockStore, 'dispatch');
      spyOn(component, 'countDown').and.returnValue(30);
      component.resendVerificationCode();
      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });

    it('should show correct html paragraph when re-send code is not allowed', () => {
      spyOn(component, 'countDown').and.returnValue(30);
      fixture.detectChanges();
      const disableResendCodeElement = compiled.querySelector(
        '[data-testid="disable-re-send-code"]'
      ) as HTMLElement;
      const enableResendCodeElement = compiled.querySelector(
        '[data-testid="enable-re-send-code"]'
      ) as HTMLElement;
      expect(disableResendCodeElement).toBeTruthy();
      expect(enableResendCodeElement).toBeFalsy();
    });

    it('should show correct html paragraph when re-send code is allowed', () => {
      spyOn(component, 'countDown').and.returnValue(0);
      fixture.detectChanges();
      const disableResendCodeElement = compiled.querySelector(
        '[data-testid="disable-re-send-code"]'
      ) as HTMLElement;
      const enableResendCodeElement = compiled.querySelector(
        '[data-testid="enable-re-send-code"]'
      ) as HTMLElement;
      expect(disableResendCodeElement).toBeFalsy();
      expect(enableResendCodeElement).toBeTruthy();
    });

    it('should disable resend verification code button when count down is different than 0', () => {
      spyOn(component, 'countDown').and.returnValue(30);
      fixture.detectChanges();
      const resendCodeButton = compiled.querySelector(
        '[data-testid="resend-code-button"]'
      ) as HTMLElement;
      expect(resendCodeButton.querySelector('button')?.disabled).toBeTrue();
    });

    it('should enable resend verification code button when count down is 0', () => {
      spyOn(component, 'countDown').and.returnValue(0);
      fixture.detectChanges();
      const resendCodeButton = compiled.querySelector(
        '[data-testid="resend-code-button"]'
      ) as HTMLElement;
      expect(resendCodeButton.querySelector('button')?.disabled).toBeFalse();
    });
  });
});
