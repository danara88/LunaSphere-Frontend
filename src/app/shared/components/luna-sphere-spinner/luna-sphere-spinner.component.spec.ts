import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaSphereSpinnerComponent } from './luna-sphere-spinner.component';
import { SpinnerTypeEnum } from './models/luna-sphere-spinner.model';

describe('LunaSphereSpinnerComponent', () => {
  let fixture: ComponentFixture<LunaSphereSpinnerComponent>;
  let component: LunaSphereSpinnerComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LunaSphereSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LunaSphereSpinnerComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Set spinner type', () => {
    it('should assign spinner type of default', () => {
      fixture.componentRef.setInput('spinnerType', SpinnerTypeEnum.DEFAULT);
      fixture.detectChanges();
      expect(component.isDefaultType).toBeTrue();
    });

    it('should assign spinner type of full', () => {
      fixture.componentRef.setInput('spinnerType', SpinnerTypeEnum.FULL);
      fixture.detectChanges();
      expect(component.isFullType).toBeTrue();
    });

    it('should assign loader class when it is type full spinner', () => {
      fixture.componentRef.setInput('spinnerType', SpinnerTypeEnum.FULL);
      fixture.detectChanges();
      const loaderElement = compiled.querySelector('[data-testId="luna-sphere-loader"]');
      expect(loaderElement?.classList.value.split(' ')).toContain('loader');
    });
  });
});
