import { ChangeDetectionStrategy, Component, Input, input, OnInit, signal } from '@angular/core';
import {
  ButtonSizeEnum,
  ButtonTypeEnum,
  ButtonVariantEnum,
} from './models/luna-sphere-button.model';

@Component({
  selector: 'luna-sphere-button',
  templateUrl: 'luna-sphere-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LunaSphereButtonComponent implements OnInit {
  readonly size = input(ButtonSizeEnum.MEDIUM);
  readonly type = input(ButtonTypeEnum.SOLID);
  readonly text = input('Button Text');
  readonly disabled = input(false);

  private _isPrimaryVariantButton = false;
  private _isSecondaryVariantButton = false;
  private _isDangerVariantButton = false;
  private readonly _isOutlineTypeButton = signal(false);
  private _variant = ButtonVariantEnum.PRIMARY;

  @Input()
  set variant(value: ButtonVariantEnum) {
    this._variant = value;
  }

  get isPrimaryVariantButton() {
    return this._isPrimaryVariantButton;
  }

  get isSecondaryVariantButton() {
    return this._isSecondaryVariantButton;
  }

  get isDangerVariantButton() {
    return this._isDangerVariantButton;
  }

  get isOutlineTypeButton() {
    return this._isOutlineTypeButton;
  }

  ngOnInit(): void {
    this._isPrimaryVariantButton = this._variant === ButtonVariantEnum.PRIMARY;
    this._isSecondaryVariantButton = this._variant === ButtonVariantEnum.SECONDARY;
    this._isDangerVariantButton = this._variant === ButtonVariantEnum.DANGER;
    this._isOutlineTypeButton.set(this.type() === ButtonTypeEnum.OUTLINE);
  }
}
