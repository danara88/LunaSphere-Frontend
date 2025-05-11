import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'luna-sphere-input-number',
  templateUrl: './luna-sphere-input-number.component.html',
  styleUrl: './luna-sphere-input-number.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LunaSphereInputNumberComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LunaSphereInputNumberComponent implements ControlValueAccessor {
  private _onTouched: any = () => {};
  private _onChange: any = () => {};
  private _disabled = false;
  private _value!: number;

  readonly onInputNumberChange = output<any>();

  private readonly _inputHtmlElement = viewChild<ElementRef<HTMLInputElement>>('inputNumber');

  indexOrder = input(0);

  get value(): number {
    return this._value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  writeValue(value: number): void {
    this._value = value;
  }

  registerOnChange(fn: unknown): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: unknown): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  onInputChange(event: any): void {
    this.onInputNumberChange.emit(event);
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^1-9]/g, '').slice(0, 1);
    this._value = Number(inputElement.value);
    this._onChange(this._value);
    this._onTouched();
  }

  focus(): void {
    this._inputHtmlElement()?.nativeElement.focus();
  }

  onBlur(): void {
    this._onTouched();
  }
}
