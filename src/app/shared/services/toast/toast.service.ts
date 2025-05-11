import { ToastData } from '@/shared/components/luna-sphere-toast/models/luna-sphere-toast.model';
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _dismissToast = signal(true);
  private readonly _toastData = signal<ToastData | undefined>(undefined);
  private readonly _defaultTime = signal(5000);

  get dismissToast(): WritableSignal<boolean> {
    return this._dismissToast;
  }

  get data(): WritableSignal<ToastData | undefined> {
    return this._toastData;
  }

  show(data: ToastData): void {
    if (!this._dismissToast()) return;
    this._toastData.set(data);
    this.dismissToast.set(false);

    setTimeout(() => {
      this._dismissToast.set(true);
    }, data.milliseconds || this._defaultTime());
  }
}
