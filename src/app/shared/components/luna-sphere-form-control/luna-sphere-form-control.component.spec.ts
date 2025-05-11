import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaSphereFormControlComponent } from './luna-sphere-form-control.component';
import { InputTypeEnum } from './models/luna-sphere-form-control.model';
import { Icon } from '@/shared/models/app-icons.enum';

describe('LunaSphereFormControlComponent', () => {
  let fixture: ComponentFixture<LunaSphereFormControlComponent>;
  let component: LunaSphereFormControlComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LunaSphereFormControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LunaSphereFormControlComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Component inputs', () => {
    it('should assign input id into input element', () => {
      const expectedId = 'test';
      fixture.componentRef.setInput('id', expectedId);
      fixture.detectChanges();
      const inputElement = compiled.querySelector('[data-testId="control-input"]');
      expect(inputElement?.id).toBe(expectedId);
    });

    it('should assign input name into input element', () => {
      const expectedName = 'test';
      fixture.componentRef.setInput('name', expectedName);
      fixture.detectChanges();
      const inputElement = compiled.querySelector('[data-testId="control-input"]');
      expect(inputElement?.getAttribute('name')).toBe(expectedName);
    });

    it('should assign input name into input element', () => {
      const expectedName = 'test';
      fixture.componentRef.setInput('name', expectedName);
      fixture.detectChanges();
      const inputElement = compiled.querySelector('[data-testId="control-input"]');
      expect(inputElement?.getAttribute('name')).toBe(expectedName);
    });

    it('should assign input placehodler into input element', () => {
      const expectedPlaceholder = 'test';
      fixture.componentRef.setInput('placeholder', expectedPlaceholder);
      fixture.detectChanges();
      const inputElement = compiled.querySelector('[data-testId="control-input"]');
      expect(inputElement?.getAttribute('placeholder')).toBe(expectedPlaceholder);
    });
  });

  describe('Write input value functionality', () => {
    it('should set value to the input when a value is passed', () => {
      const expectedValue = 'Test Value';
      component.writeValue(expectedValue);
      expect(component.value).toBe(expectedValue);
    });

    it('should insert value into input element when writaValue is called', () => {
      const expectedValue = 'Test Value';
      component.writeValue(expectedValue);
      fixture.detectChanges();
      const inputElement = compiled.querySelector(
        '[data-testId="control-input"]'
      ) as HTMLInputElement;
      expect(inputElement.value).toBe(expectedValue);
    });

    it('should call onInputChange when input value change', () => {
      const onInputChangeSpy = spyOn(component, 'onInputChange');
      const inputElement = compiled.querySelector(
        '[data-testId="control-input"]'
      ) as HTMLInputElement;
      const event = new Event('input');
      inputElement.dispatchEvent(event);
      fixture.detectChanges();
      expect(onInputChangeSpy).toHaveBeenCalledOnceWith(event);
    });
  });

  describe('Visibility icon', () => {
    it('should display visibility icon when input type is password and input displayVisibilityIcon is true', () => {
      fixture.componentRef.setInput('type', InputTypeEnum.PASSWORD);
      fixture.componentRef.setInput('displayVisibilityIcon', true);
      fixture.detectChanges();
      const visibilityIconElement = compiled.querySelector('[data-testId="visibility-icon"]');
      expect(component.displayVisibilityIcon).toBeTrue();
      expect(visibilityIconElement).toBeTruthy();
    });

    it('should not display visibility icon when input type is not password and input displayVisibilityIcon is true', () => {
      fixture.componentRef.setInput('type', InputTypeEnum.TEXT);
      fixture.componentRef.setInput('displayVisibilityIcon', true);
      fixture.detectChanges();
      const visibilityIconElement = compiled.querySelector('[data-testId="visibility-icon"]');
      expect(component.displayVisibilityIcon).toBeFalse();
      expect(visibilityIconElement).toBeFalsy();
    });

    it('should not display visibility icon when input type is password and input displayVisibilityIcon is false', () => {
      fixture.componentRef.setInput('type', InputTypeEnum.PASSWORD);
      fixture.componentRef.setInput('displayVisibilityIcon', false);
      fixture.detectChanges();
      const visibilityIconElement = compiled.querySelector('[data-testId="visibility-icon"]');
      expect(component.displayVisibilityIcon).toBeFalse();
      expect(visibilityIconElement).toBeFalsy();
    });
  });

  describe('Password visibility', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', InputTypeEnum.PASSWORD);
      fixture.componentRef.setInput('displayVisibilityIcon', true);
      fixture.detectChanges();
    });
    it('should toggle input type and visibility icon', () => {
      component.togglePasswordVisibility();
      expect(component.type).toBe(InputTypeEnum.TEXT);
      expect(component.passwordVisibleIcon).toBe(Icon.VISIBILITY_ON);

      component.togglePasswordVisibility();
      expect(component.type).toBe(InputTypeEnum.PASSWORD);
      expect(component.passwordVisibleIcon).toBe(Icon.VISIBILITY_OFF);
    });
  });

  describe('Control label displayed', () => {
    it('should display label element when label input is passed', () => {
      const expectedLabel = 'Test Label';
      fixture.componentRef.setInput('label', expectedLabel);
      fixture.detectChanges();
      const labelElement = compiled.querySelector('[data-testId="control-label"]');
      expect(labelElement).toBeTruthy();
      expect(labelElement?.textContent?.trim()).toBe(expectedLabel);
    });

    it('should not display label element when label input is passed', () => {
      fixture.componentRef.setInput('label', '');
      fixture.detectChanges();
      const labelElement = compiled.querySelector('[data-testId="control-label"]');
      expect(labelElement).toBeFalsy();
    });
  });

  describe('Control errors', () => {
    it('should add error classes when control has errors', () => {
      fixture.componentRef.setInput('hasError', true);
      fixture.detectChanges();
      const controlContainerElement = compiled.querySelector('[data-testId="control-container"]');
      const controlContainerElementClassList = controlContainerElement?.classList.value.split(' ');

      const inputElement = compiled.querySelector('[data-testId="control-input"]');
      const inputElementClassList = inputElement?.classList.value.split(' ');

      expect(controlContainerElementClassList).toContain('bg-error-25');
      expect(controlContainerElementClassList).not.toContain('bg-neutral-200');
      expect(inputElementClassList).toContain('text-error-500');
      expect(inputElementClassList).toContain('placeholder-error-300');
      expect(inputElementClassList).not.toContain('text-neutral-800');
    });

    it('should add error classes to icon when control has errors', () => {
      fixture.componentRef.setInput('showIcon', true);
      fixture.componentRef.setInput('hasError', true);
      fixture.detectChanges();
      const iconElement = compiled.querySelector('[data-testId="control-icon"]');
      const iconElementClasses = iconElement?.classList.value.split(' ');
      expect(iconElementClasses).toContain('text-error-500');
    });
  });

  describe('Display control icon', () => {
    it('should display icon when showIcon is true', () => {
      fixture.componentRef.setInput('showIcon', true);
      fixture.detectChanges();
      const iconElement = compiled.querySelector('[data-testId="control-icon"]');
      expect(iconElement).toBeTruthy();
    });

    it('should not display icon when showIcon is false', () => {
      fixture.componentRef.setInput('showIcon', false);
      fixture.detectChanges();
      const iconElement = compiled.querySelector('[data-testId="control-icon"]');
      expect(iconElement).toBeFalsy();
    });

    it('should display correct icon', () => {
      fixture.componentRef.setInput('showIcon', true);
      fixture.componentRef.setInput('icon', Icon.ARROW_BACK);
      fixture.detectChanges();
      const iconElement = compiled.querySelector('[data-testId="control-icon"]');
      expect(iconElement?.textContent?.trim()).toBe(Icon.ARROW_BACK);
    });
  });
});
