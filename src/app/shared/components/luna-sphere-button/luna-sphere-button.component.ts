import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
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
  readonly variant = input(ButtonVariantEnum.PRIMARY);
  readonly text = input('Button Text');
  readonly disabled = input(false);

  private readonly _isPrimaryVariantButton = signal(false);
  private readonly _isSecondaryVariantButton = signal(false);
  private readonly _isDangerVariantButton = signal(false);
  private readonly _isOutlineTypeButton = signal(false);
  private readonly _isSolidTypeButton = signal(false);

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

  get isSolidTypeButton() {
    return this._isSolidTypeButton;
  }

  ngOnInit(): void {
    // Variants
    this._isPrimaryVariantButton.set(this.variant() === ButtonVariantEnum.PRIMARY);
    this._isSecondaryVariantButton.set(this.variant() === ButtonVariantEnum.SECONDARY);
    this._isDangerVariantButton.set(this.variant() === ButtonVariantEnum.DANGER);

    // Types
    this._isOutlineTypeButton.set(this.type() === ButtonTypeEnum.OUTLINE);
    this._isSolidTypeButton.set(this.type() === ButtonTypeEnum.SOLID);
  }
}
