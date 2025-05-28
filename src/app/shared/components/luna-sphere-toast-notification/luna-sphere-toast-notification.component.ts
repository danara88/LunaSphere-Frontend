import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { ToastNotificationService } from '@/shared/services/toast-notification-service/toast-notification.service';
import { ToastSeverity } from './models/luna-sphere-toast-notification.model';
import { Icon } from '@/shared/models/app-icons.enum';

@Component({
  selector: 'luna-sphere-toast',
  templateUrl: './luna-sphere-toast-notification.component.html',
  styleUrl: './luna-sphere-toast-notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LunaSphereToastNotificationComponent {
  private readonly _toastNotificationService = inject(ToastNotificationService);

  readonly isToastSuccess = computed(
    () => this._toastNotificationService.data()?.severity === ToastSeverity.SUCCESS
  );
  readonly isToastError = computed(
    () => this._toastNotificationService.data()?.severity === ToastSeverity.ERRROR
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

  readonly toastDetail = computed(() => this._toastNotificationService.data()?.detail);
}
