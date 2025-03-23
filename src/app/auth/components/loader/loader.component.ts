import { SpinnerTypeEnum } from '@/shared/components/luna-sphere-spinner/models/luna-sphere-spinner.model';
import { LoaderService } from '@/shared/services/loader/loader.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'loader-component',
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  readonly loaderServcie = inject(LoaderService);

  get isDefaultType(): boolean {
    return this.loaderServcie.loaderConfig.spinnerType === SpinnerTypeEnum.DEFAULT;
  }

  get isFullType(): boolean {
    return this.loaderServcie.loaderConfig.spinnerType === SpinnerTypeEnum.FULL;
  }
}
