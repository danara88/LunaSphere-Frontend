import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaSphereToastNotificationComponent } from './luna-sphere-toast-notification.component';
import { ToastNotificationService } from '@/shared/services/toast-notification-service/toast-notification.service';
import { ToastData, ToastSeverity } from './models/luna-sphere-toast-notification.model';
import { Icon } from '@/shared/models/app-icons.enum';

describe('LunaSphereToastNotificationComponent', () => {
  let fixture: ComponentFixture<LunaSphereToastNotificationComponent>;
  let component: LunaSphereToastNotificationComponent;
  let compiled: HTMLElement;
  let toastNotificationServiceSpy: jasmine.SpyObj<ToastNotificationService>;

  beforeEach(async () => {
    toastNotificationServiceSpy = jasmine.createSpyObj('ToastNotificationService', ['data']);

    await TestBed.configureTestingModule({
      declarations: [LunaSphereToastNotificationComponent],
      providers: [
        {
          provide: ToastNotificationService,
          useValue: toastNotificationServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LunaSphereToastNotificationComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Severity: Success', () => {
    const mockToastDataSuccess = {
      detail: 'Test Toast Detail',
      severity: ToastSeverity.SUCCESS,
    } as ToastData;

    beforeEach(() => {
      toastNotificationServiceSpy.data.and.returnValue(mockToastDataSuccess);
    });

    it('should set the toast notification as success when the severity is SUCCESS', () => {
      expect(component.isToastSuccess()).toBeTrue();
      expect(component.isToastError()).toBeFalse();
    });

    it('should set correct toast notification icon when severity is SUCCESS', () => {
      expect(component.toastIcon()).toEqual(Icon.CHECK);
    });

    it('should have correct success classes', () => {
      const toastDivElement = compiled.querySelector('[data-testId="toast"]');
      const toastIconElement = compiled.querySelector('[data-testId="toast-icon"]');
      const toastSpanTitleElement = compiled.querySelector('[data-testId="toast-title"]');
      const toastDetailElement = compiled.querySelector('[data-testId="toast-detail"]');

      fixture.detectChanges();

      const toastDivElementClasses = toastDivElement?.classList.value.split(' ');
      const toastIconElementClasses = toastIconElement?.classList.value.split(' ');
      const toastSpanTitleElementClasses = toastSpanTitleElement?.classList.value.split(' ');

      expect(toastDivElementClasses).toContain('border-success-500');
      expect(toastIconElementClasses).toContain('text-success-500');
      expect(toastSpanTitleElementClasses).toContain('text-success-500');
      expect(toastSpanTitleElement?.textContent?.trim()).toBe('Succeed!');
      expect(toastDetailElement?.textContent?.trim()).toBe(mockToastDataSuccess.detail);
    });
  });

  describe('Severity: Error', () => {
    const mockToastDataError = {
      detail: 'Test Toast Detail',
      severity: ToastSeverity.ERRROR,
    } as ToastData;

    beforeEach(() => {
      toastNotificationServiceSpy.data.and.returnValue(mockToastDataError);
    });

    it('should set the toast notification as error when the severity is ERROR', () => {
      expect(component.isToastError()).toBeTrue();
      expect(component.isToastSuccess()).toBeFalse();
    });

    it('should set correct toast notification icon when severity is ERROR', () => {
      expect(component.toastIcon()).toEqual(Icon.ERROR_OUTLINE);
    });

    it('should have correct error classes', () => {
      const toastDivElement = compiled.querySelector('[data-testId="toast"]');
      const toastIconElement = compiled.querySelector('[data-testId="toast-icon"]');
      const toastSpanTitleElement = compiled.querySelector('[data-testId="toast-title"]');
      const toastDetailElement = compiled.querySelector('[data-testId="toast-detail"]');

      fixture.detectChanges();

      const toastDivElementClasses = toastDivElement?.classList.value.split(' ');
      const toastIconElementClasses = toastIconElement?.classList.value.split(' ');
      const toastSpanTitleElementClasses = toastSpanTitleElement?.classList.value.split(' ');

      expect(toastDivElementClasses).toContain('border-error-500');
      expect(toastIconElementClasses).toContain('text-error-500');
      expect(toastSpanTitleElementClasses).toContain('text-error-500');
      expect(toastSpanTitleElement?.textContent?.trim()).toBe('Error');
      expect(toastDetailElement?.textContent?.trim()).toBe(mockToastDataError.detail);
    });
  });
});
