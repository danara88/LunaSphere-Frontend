import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IconEnum, InputTypeEnum } from './models/luna-sphere-form-control.model';

@Component({
  selector: 'luna-sphere-form-control',
  templateUrl: './luna-sphere-form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LunaSphereFormControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LunaSphereFormControlComponent implements ControlValueAccessor, OnInit {
  readonly name = input('name');
  readonly id = input('id');
  readonly icon = input(IconEnum.MAIL_OUTLINE);
  readonly showIcon = input(false);
  readonly placeholder = input('');
  readonly hasError = input(false);
  readonly label = input('');

  private _onTouched: any = () => {};
  private _onChange: any = () => {};
  private _disabled = false;
  private _value!: string;
  private _type = InputTypeEnum.TEXT;
  private _isPasswordVisible = false;
  private _displayVisibilityIcon = false;
  private _passwordVisibleIcon: IconEnum.VISIBILITY_OFF | IconEnum.VISIBILITY_ON =
    IconEnum.VISIBILITY_OFF;

  @Input() set type(value: InputTypeEnum) {
    this._type = value;
  }

  @Input() set displayVisibilityIcon(value: boolean) {
    if (this._type !== InputTypeEnum.PASSWORD) {
      this._displayVisibilityIcon = false;
      return;
    }
    this._displayVisibilityIcon = value;
  }

  get displayVisibilityIcon(): boolean {
    return this._displayVisibilityIcon;
  }

  get isPasswordVisible(): boolean {
    return this._isPasswordVisible;
  }

  get passwordVisibleIcon(): string {
    return this._passwordVisibleIcon;
  }

  get type(): InputTypeEnum {
    return this._type;
  }

  get value(): string {
    return this._value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this._isPasswordVisible = !this._isPasswordVisible;
    if (this._isPasswordVisible) {
      this._type = InputTypeEnum.TEXT;
      this._passwordVisibleIcon = IconEnum.VISIBILITY_ON;
      return;
    }
    this._type = InputTypeEnum.PASSWORD;
    this._passwordVisibleIcon = IconEnum.VISIBILITY_OFF;
  }

  writeValue(value: string): void {
    this._value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  registerOnChange(fn: unknown): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: unknown): void {
    this._onTouched = fn;
  }

  onInputChange(event: any): void {
    const value = event.target.value;
    this._value = value;
    this._onChange(value);
    this._onTouched();
  }

  onBlur(): void {
    this._onTouched();
  }
}
