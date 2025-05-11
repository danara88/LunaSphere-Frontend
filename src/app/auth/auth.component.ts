import { LoaderService } from '@/shared/services/loader/loader.service';
import { ToastService } from '@/shared/services/toast/toast.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  host: {
    class: 'h-screen w-full inline-block',
  },
})
export class AuthComponent {
  readonly loaderService = inject(LoaderService);
  readonly toastService = inject(ToastService);
}
