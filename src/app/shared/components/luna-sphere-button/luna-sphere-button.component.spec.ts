import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaSphereButtonComponent } from './luna-sphere-button.component';
import { ButtonTypeEnum, ButtonVariantEnum } from './models/luna-sphere-button.model';

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
    it('should set isPrimaryVariantButton to true when button variant is PRIMARY', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.PRIMARY);
      fixture.detectChanges();
      expect(component.isPrimaryVariantButton()).toBeTrue();
    });

    it('should set isSecondaryVariantButton to true when button variant is SECONDARY', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.SECONDARY);
      fixture.detectChanges();
      expect(component.isSecondaryVariantButton()).toBeTrue();
    });

    it('should set isDangerVariantButton to true when button variant is DANGER', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.DANGER);
      fixture.detectChanges();
      expect(component.isDangerVariantButton()).toBeTrue();
    });

    it('should add btn primary class when isPrimaryVariantButton is true', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.PRIMARY);
      fixture.detectChanges();
      const buttonElement = compiled.querySelector('[data-testId="luna-sphere-button"]');
      const classes = buttonElement?.classList.value.split(' ');
      expect(classes).toContain('btn-primary--solid');
    });

    it('should add btn secondary class when isSecondaryVariantButton is true', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.SECONDARY);
      fixture.detectChanges();
      const buttonElement = compiled.querySelector('[data-testId="luna-sphere-button"]');
      const classes = buttonElement?.classList.value.split(' ');
      expect(classes).toContain('btn-secondary');
    });
  });

  describe('Button type', () => {
    it('should set isOutlineTypeButton to true when button type is OUTLINE', () => {
      fixture.componentRef.setInput('type', ButtonTypeEnum.OUTLINE);
      fixture.detectChanges();
      expect(component.isOutlineTypeButton()).toBeTrue();
    });

    it('should set isSolidTypeButton to true when button type is SOLID', () => {
      fixture.componentRef.setInput('type', ButtonTypeEnum.SOLID);
      fixture.detectChanges();
      expect(component.isSolidTypeButton()).toBeTrue();
    });
  });

  describe('Button variant and type combinations', () => {
    it('should add primary variant class with outline when variant is PRIMARY and type is OUTLINE', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.PRIMARY);
      fixture.componentRef.setInput('type', ButtonTypeEnum.OUTLINE);
      fixture.detectChanges();
      const buttonElement = compiled.querySelector('[data-testId="luna-sphere-button"]');
      const classes = buttonElement?.classList.value.split(' ');
      expect(classes).toContain('btn-primary--outline');
    });

    it('should add primary variant class with solid when variant is PRIMARY and type is SOLID', () => {
      fixture.componentRef.setInput('variant', ButtonVariantEnum.PRIMARY);
      fixture.componentRef.setInput('type', ButtonTypeEnum.SOLID);
      fixture.detectChanges();
      const buttonElement = compiled.querySelector('[data-testId="luna-sphere-button"]');
      const classes = buttonElement?.classList.value.split(' ');
      expect(classes).toContain('btn-primary--solid');
    });
  });
});
