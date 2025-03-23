import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaSphereButtonComponent } from './luna-sphere-button.component';
import { ButtonVariantEnum } from './models/luna-sphere-button.model';

describe('LunaSphereButtonComponent', () => {
  let fixture: ComponentFixture<LunaSphereButtonComponent>;
  let component: LunaSphereButtonComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LunaSphereButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LunaSphereButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive button text', () => {
    const expectedText = 'Sign in';
    fixture.componentRef.setInput('text', expectedText);
    fixture.detectChanges();
    const buttonElement = compiled.querySelector('[data-testId="luna-sphere-button"]');
    expect(buttonElement?.textContent?.trim()).toBe(expectedText);
  });

  describe('Button variant', () => {
    it('should set isPrimaryVariantButton to true when button variant is primary', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.PRIMARY);
      fixture.detectChanges();
      expect(component.isPrimaryVariantButton).toBeTrue();
    });

    it('should set isSecondaryVariantButton to true when button variant is secondary', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.SECONDARY);
      fixture.detectChanges();
      expect(component.isSecondaryVariantButton).toBeTrue();
    });

    it('should set isDangerVariantButton to true when button variant is danger', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.DANGER);
      fixture.detectChanges();
      expect(component.isDangerVariantButton).toBeTrue();
    });

    it('should add btn primary class when isPrimaryVariantButton is true', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.PRIMARY);
      fixture.detectChanges();
      const buttonElement = compiled.querySelector('[data-testId="luna-sphere-button"]');
      const classes = buttonElement?.classList.value.split(' ');
      expect(classes).toContain('btn-primary');
    });

    it('should add btn secondary class when isSecondaryVariantButton is true', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.SECONDARY);
      fixture.detectChanges();
      const buttonElement = compiled.querySelector('[data-testId="luna-sphere-button"]');
      const classes = buttonElement?.classList.value.split(' ');
      expect(classes).toContain('btn-secondary');
    });
  });
});
