import { FormControl, FormGroup } from '@angular/forms';

import { FormUtils } from './form-utils';

describe('FormUtils', () => {
  it('should have correct pattern values', () => {
    const expectedEmailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    const expectedPasswordPattern =
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

    expect(FormUtils.emailPattern).toBe(expectedEmailPattern);
    expect(FormUtils.passwordPattern).toBe(expectedPasswordPattern);
  });

  it('should set control as invalid field', () => {
    const mockFormGroup = new FormGroup({
      testControl: new FormControl(''),
    });
    mockFormGroup.controls['testControl'].setErrors({ error: true });
    mockFormGroup.controls['testControl'].markAllAsTouched();
    const result = FormUtils.isInvalidField(mockFormGroup, 'testControl');
    expect(result).toBe(true);
  });

  describe('Get control error message', () => {
    const mockFormGroup = new FormGroup({
      testControl: new FormControl(''),
    });

    it('should return null when the control does not exist', () => {
      const result = FormUtils.getFieldError(mockFormGroup, 'NotExistingField');
      expect(result).toBeNull();
    });

    it('should return required error message when required valdiation fails', () => {
      const control = mockFormGroup.controls['testControl'];
      control.setErrors({ required: true });
      const result = FormUtils.getFieldError(mockFormGroup, 'testControl');
      expect(result).toBe('This field is required. Please fill it in.');
    });

    it('should return email pattern error message when email pattern valdiation fails', () => {
      const control = mockFormGroup.controls['testControl'];
      control.setErrors({
        pattern: { requiredPattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$' },
      });
      const result = FormUtils.getFieldError(mockFormGroup, 'testControl');
      expect(result).toBe('Enter a valid email address (e.g., name@example.com).');
    });

    it('should return password email pattern error message when password pattern valdiation fails', () => {
      const control = mockFormGroup.controls['testControl'];
      control.setErrors({
        pattern: {
          requiredPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
        },
      });
      const result = FormUtils.getFieldError(mockFormGroup, 'testControl');
      expect(result).toBe(
        'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
    });

    it('should return defaulterror message when none errors are meet', () => {
      const control = mockFormGroup.controls['testControl'];
      control.setErrors({
        otherError: true,
      });
      const result = FormUtils.getFieldError(mockFormGroup, 'testControl');
      expect(result).toBe('Invalid field value. Please check your entry.');
    });

    it('should return null when the control does not have errors', () => {
      const control = mockFormGroup.controls['testControl'];
      control.setErrors(null);
      const result = FormUtils.getFieldError(mockFormGroup, 'testControl');
      expect(result).toBeNull();
    });
  });
});
