import { computed, Injectable, signal } from '@angular/core';

import {
  LoaderData,
  LoaderTypeEnum,
} from '@/shared/components/luna-sphere-loader/models/luna-sphere-loader.model';

/**
 * @class LoaderService
 * @description In charge of displaying app loader
 */
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly _dismissLoader = signal(true);
  private readonly _data = signal<LoaderData | undefined>(undefined);

  readonly dismissLoader = computed(() => this._dismissLoader());
  readonly data = computed(() => this._data());
  readonly isModalLoaderType = computed(() => this.data()?.type === LoaderTypeEnum.MODAL_SCREEN);
  readonly isFullLoaderType = computed(() => this.data()?.type === LoaderTypeEnum.FULL_SCREEN);

  showLoader(data: LoaderData): void {
    this._data.set(undefined);
    this._data.set(data);
    this._dismissLoader.set(false);
  }

  hideLoader(): void {
    this._data.set(undefined);
    this._dismissLoader.set(true);
  }
}
