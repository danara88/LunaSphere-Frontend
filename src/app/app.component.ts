import { Component, computed, inject } from '@angular/core';

import { LoaderService } from './shared/services/loader-service/loader.service';
import { ToastNotificationService } from './shared/services/toast-notification-service/toast-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly _loaderService = inject(LoaderService);
  private readonly _toastNotificationService = inject(ToastNotificationService);

  readonly dismissLoader = computed(() => this._loaderService.dismissLoader());
  readonly dismissToast = computed(() => this._toastNotificationService.dismissToast());
  readonly isFullLoaderType = computed(() => this._loaderService.isFullLoaderType());
}
