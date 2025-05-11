import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaSphereToastComponent } from './luna-sphere-toast.component';
import { ToastService } from '@/shared/services/toast/toast.service';
import { ToastData, ToastSeverity } from './models/luna-sphere-toast.model';
import { Icon } from '@/shared/models/app-icons.enum';

describe('LunaSphereToastComponent', () => {
  let fixture: ComponentFixture<LunaSphereToastComponent>;
  let component: LunaSphereToastComponent;
  let compiled: HTMLElement;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['data']);

    await TestBed.configureTestingModule({
      declarations: [LunaSphereToastComponent],
      providers: [
        {
          provide: ToastService,
          useValue: toastServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LunaSphereToastComponent);
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
      toastServiceSpy.data.and.returnValue(mockToastDataSuccess);
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
      toastServiceSpy.data.and.returnValue(mockToastDataError);
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
