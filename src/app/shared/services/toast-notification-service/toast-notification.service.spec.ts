import { TestBed } from '@angular/core/testing';

import { ToastNotificationService } from './toast-notification.service';
import { ToastSeverity } from '@/shared/components/luna-sphere-toast-notification/models/luna-sphere-toast-notification.model';

describe('ToastNotificationService', () => {
  let service: ToastNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    service = TestBed.inject(ToastNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should keep the toast visible initially and dismiss it after the delay', (done) => {
    const mockToastData = {
      detail: 'test',
      severity: ToastSeverity.SUCCESS,
      milliseconds: 100,
    };
    service.show(mockToastData);
    expect(service.dismissToast()).toBeFalse();
    expect(service.data()).toEqual(mockToastData);
    setTimeout(() => {
      expect(service.dismissToast()).toBeTruthy();
      done();
    }, 200);
  });
});
