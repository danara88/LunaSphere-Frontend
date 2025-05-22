import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaSphereInputNumberComponent } from './luna-sphere-input-number.component';

describe('LunaSphereInputNumberComponent', () => {
  let fixture: ComponentFixture<LunaSphereInputNumberComponent>;
  let component: LunaSphereInputNumberComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LunaSphereInputNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LunaSphereInputNumberComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Write input value functionality', () => {
    it('should set value to the input when a value is passed', () => {
      const expectedValue = 1;
      component.writeValue(expectedValue);
      expect(component.value).toBe(expectedValue);
    });

    it('should insert value into input element when writaValue is called', () => {
      const expectedValue = 1;
      component.writeValue(expectedValue);
      fixture.detectChanges();
      const inputElement = compiled.querySelector(
        '[data-testId="input-number"]'
      ) as HTMLInputElement;
      expect(inputElement.value).toBe(expectedValue.toString());
    });

    it('should call onInputChange when input value change', () => {
      const onInputChangeSpy = spyOn(component, 'onInputChange');
      const inputElement = compiled.querySelector(
        '[data-testId="input-number"]'
      ) as HTMLInputElement;
      const event = new Event('input');
      inputElement.dispatchEvent(event);
      fixture.detectChanges();
      expect(onInputChangeSpy).toHaveBeenCalledOnceWith(event);
    });
  });

  it('should emit event on input change', () => {
    const mockInputElement = {
      value: '12',
    } as HTMLInputElement;

    const mockEvent = {
      target: mockInputElement,
    } as unknown as Event;

    spyOn(component.onInputNumberChange, 'emit');
    component.onInputChange(mockEvent);
    fixture.detectChanges();
    expect(component.onInputNumberChange.emit).toHaveBeenCalledWith(mockEvent);
  });

  it('should focus the inner input number', () => {
    const inputElement = compiled.querySelector('[data-testId="input-number"]') as HTMLInputElement;
    component.focus();
    expect(document.activeElement).toBe(inputElement);
  });
});
