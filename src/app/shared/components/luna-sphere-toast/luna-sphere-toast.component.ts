import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { ToastService } from '@/shared/services/toast/toast.service';
import { ToastSeverity } from './models/luna-sphere-toast.model';
import { Icon } from '@/shared/models/app-icons.enum';

@Component({
  selector: 'luna-sphere-toast',
  templateUrl: './luna-sphere-toast.component.html',
  styleUrl: './luna-sphere-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LunaSphereToastComponent {
  private readonly _toastService = inject(ToastService);

  readonly isToastSuccess = computed(
    () => this._toastService.data()?.severity === ToastSeverity.SUCCESS
  );
  readonly isToastError = computed(
    () => this._toastService.data()?.severity === ToastSeverity.ERRROR
  );

  readonly toastIcon = computed(() => {
    if (this.isToastError()) {
      return Icon.ERROR_OUTLINE;
    }
    if (this.isToastSuccess()) {
      return Icon.CHECK;
    }
    return Icon.CHECK;
  });

  readonly toastDetail = computed(() => this._toastService.data()?.detail);
}
