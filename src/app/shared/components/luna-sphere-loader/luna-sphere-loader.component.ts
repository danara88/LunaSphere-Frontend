import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { LoaderService } from '@/shared/services/loader-service/loader.service';

@Component({
  selector: 'luna-sphere-loader',
  templateUrl: './luna-sphere-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LunaSphereLoaderComponent {
  private readonly _loaderService = inject(LoaderService);

  readonly data = computed(() => this._loaderService.data());
  readonly isModalLoaderType = computed(() => this._loaderService.isModalLoaderType());
}
