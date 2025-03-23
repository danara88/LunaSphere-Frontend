import { Injectable } from '@angular/core';

import { LoaderConfig } from '../../../auth/components/loader/models/loader.model';
import { SpinnerTypeEnum } from '@/shared/components/luna-sphere-spinner/models/luna-sphere-spinner.model';

/**
 * @class LoaderService
 * @description In charge of displaying loader screen
 */
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _dismissLoader: boolean = true;

  loaderConfig: LoaderConfig = {
    title: '',
    description: '',
    spinnerType: SpinnerTypeEnum.FULL,
  };

  get dismissLoader() {
    return this._dismissLoader;
  }

  showLoader() {
    this._dismissLoader = false;
  }

  hideLoader() {
    this._dismissLoader = true;
  }
}
