import { FormGroup } from '@angular/forms';

export class FormUtils {
  static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static readonly passwordPattern =
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

  private static readonly _defaultErrorMessage = 'Invalid field value. Please check your entry.';
  private static readonly _requiredErrorMessage = 'This field is required. Please fill it in.';
  private static readonly _emailErrorMessage =
    'Enter a valid email address (e.g., name@example.com).';
  private static readonly _passwordErrorMessage =
    'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';

  /**
   * @memberof FormUtils
   * @method isInvalidField
   * @description Determine if a control is invalid or not
   * @returns {boolean | null}
   */
  static isInvalidField(formGroup: FormGroup, fieldName: string): boolean {
    return formGroup.controls[fieldName]?.invalid && formGroup.controls[fieldName]?.touched;
  }

  /**
   * @memberof FormUtils
   * @method getFieldError
   * @description Returns the error of a form field
   * @returns {string | null}
   */
  static getFieldError(formGroup: FormGroup, fieldName: string): string | null {
    if (!formGroup.controls[fieldName]) return null;

    const errors = formGroup.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return this._requiredErrorMessage;
        case 'pattern':
          if (errors[key].requiredPattern === this.emailPattern) {
            return this._emailErrorMessage;
          }

          if (errors[key].requiredPattern === this.passwordPattern) {
            return this._passwordErrorMessage;
          }

          return this._defaultErrorMessage;
        default:
          return this._defaultErrorMessage;
      }
    }

    return null;
  }
}
