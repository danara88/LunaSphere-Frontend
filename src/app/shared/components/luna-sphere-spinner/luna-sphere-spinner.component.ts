import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SpinnerTypeEnum } from './models/luna-sphere-spinner.model';

@Component({
  selector: 'luna-sphere-spinner',
  templateUrl: './luna-sphere-spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LunaSphereSpinnerComponent implements OnInit {
  private _spinnerType = SpinnerTypeEnum.DEFAULT;
  private _isDefaultType = false;
  private _isFullType = false;

  @Input() set spinnerType(value: SpinnerTypeEnum) {
    this._spinnerType = value;
  }

  get isDefaultType(): boolean {
    return this._isDefaultType;
  }

  get isFullType(): boolean {
    return this._isFullType;
  }

  ngOnInit(): void {
    this._isDefaultType = this._spinnerType === SpinnerTypeEnum.DEFAULT;
    this._isFullType = this._spinnerType === SpinnerTypeEnum.FULL;
  }
}
