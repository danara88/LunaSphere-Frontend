import { ChangeDetectionStrategy, Component, Input, input, OnInit } from '@angular/core';
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

  private _isPrimaryVariantButton = false;
  private _isSecondaryVariantButton = false;
  private _isDangerVariantButton = false;
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

  ngOnInit(): void {
    this._isPrimaryVariantButton = this._variant === ButtonVariantEnum.PRIMARY;
    this._isSecondaryVariantButton = this._variant === ButtonVariantEnum.SECONDARY;
    this._isDangerVariantButton = this._variant === ButtonVariantEnum.DANGER;
  }
}
