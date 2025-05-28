import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LunaSphereToastNotificationComponent } from './shared/components/luna-sphere-toast-notification/luna-sphere-toast-notification.component';
import { LunaSphereLoaderComponent } from './shared/components/luna-sphere-loader/luna-sphere-loader.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, LunaSphereToastNotificationComponent, LunaSphereLoaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should hide content and show loader as modal', () => {
    spyOn(component, 'dismissLoader').and.returnValue(false);
    spyOn(component, 'isFullLoaderType').and.returnValue(false);
    fixture.detectChanges();
    const routerOutletContent = compiled.querySelector('[data-testid="content"]');
    const loaderElement = compiled.querySelector('[data-testid="loader"]');
    expect(routerOutletContent).toBeFalsy();
    expect(loaderElement).toBeTruthy();
  });

  it('should show content and loader when loader is type full screen', () => {
    spyOn(component, 'dismissLoader').and.returnValue(false);
    spyOn(component, 'isFullLoaderType').and.returnValue(true);
    fixture.detectChanges();
    const routerOutletContent = compiled.querySelector('[data-testid="content"]');
    const loaderElement = compiled.querySelector('[data-testid="loader"]');
    expect(routerOutletContent).toBeTruthy();
    expect(loaderElement).toBeTruthy();
  });

  it('should show toast notification element when dismissToast is false', () => {
    spyOn(component, 'dismissToast').and.returnValue(false);
    fixture.detectChanges();
    const toastNotificationElement = compiled.querySelector('[data-testid="toast"]');
    expect(toastNotificationElement).toBeTruthy();
  });

  it('should hide toast notification element when dismissToast is true', () => {
    spyOn(component, 'dismissToast').and.returnValue(true);
    fixture.detectChanges();
    const toastNotificationElement = compiled.querySelector('[data-testid="toast"]');
    expect(toastNotificationElement).toBeFalsy();
  });
});
