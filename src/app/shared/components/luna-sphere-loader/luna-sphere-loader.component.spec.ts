import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderService } from '@/shared/services/loader-service/loader.service';
import { LunaSphereLoaderComponent } from './luna-sphere-loader.component';
import { LoaderData, LoaderTypeEnum } from './models/luna-sphere-loader.model';

describe('LunaSphereLoaderComponent', () => {
  let fixture: ComponentFixture<LunaSphereLoaderComponent>;
  let component: LunaSphereLoaderComponent;
  let compiled: HTMLElement;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;

  const mockLoaderData = {
    title: 'Test Loader Title',
    detail: 'Test Loader Detail',
    type: LoaderTypeEnum.MODAL_SCREEN,
  } as LoaderData;

  beforeEach(async () => {
    loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['data', 'isModalLoaderType']);

    await TestBed.configureTestingModule({
      declarations: [LunaSphereLoaderComponent],
      providers: [
        {
          provide: LoaderService,
          useValue: loaderServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LunaSphereLoaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set loader data from loader service', () => {
    loaderServiceSpy.data.and.returnValue(mockLoaderData);
    expect(component.data()).toEqual(mockLoaderData);
  });

  it('should assign value to isModalLoaderType when loader service returns a value ', () => {
    loaderServiceSpy.isModalLoaderType.and.returnValue(true);
    expect(component.isModalLoaderType()).toBeTrue();
  });

  it('should show modal loader screen when isModalLoaderType is true and data is not undefined', () => {
    spyOn(component, 'data').and.returnValue(mockLoaderData);
    spyOn(component, 'isModalLoaderType').and.returnValue(true);
    fixture.detectChanges();
    const modalLoaderElement = compiled.querySelector('[data-testId="modal-loader-screen"]');
    const fullLoaderElement = compiled.querySelector('[data-testId="full-loader-screen"]');
    expect(modalLoaderElement).toBeTruthy();
    expect(fullLoaderElement).toBeFalsy();
  });

  it('should show full loader screen when loader data type is not MODAL_SCREEN', () => {
    spyOn(component, 'isModalLoaderType').and.returnValue(false);
    fixture.detectChanges();
    const fullLoaderElement = compiled.querySelector('[data-testId="full-loader-screen"]');
    const modalLoaderElement = compiled.querySelector('[data-testId="modal-loader-screen"]');
    expect(fullLoaderElement).toBeTruthy();
    expect(modalLoaderElement).toBeFalsy();
  });

  it('should show full loader screen when loader data is undefined', () => {
    spyOn(component, 'data').and.returnValue(undefined);
    fixture.detectChanges();
    const fullLoaderElement = compiled.querySelector('[data-testId="full-loader-screen"]');
    const modalLoaderElement = compiled.querySelector('[data-testId="modal-loader-screen"]');
    expect(fullLoaderElement).toBeTruthy();
    expect(modalLoaderElement).toBeFalsy();
  });

  it('should add title and detail texts when data is not undefined and isModalLoaderType is true', () => {
    spyOn(component, 'data').and.returnValue(mockLoaderData);
    spyOn(component, 'isModalLoaderType').and.returnValue(true);
    fixture.detectChanges();
    const textTitleElement = compiled.querySelector(
      '[data-testId="modal-loader-title"]'
    ) as HTMLElement;
    const textDetailElement = compiled.querySelector(
      '[data-testId="modal-loader-detail"]'
    ) as HTMLElement;
    expect(textTitleElement.textContent?.trim()).toBe(mockLoaderData.title);
    expect(textDetailElement.textContent?.trim()).toBe(mockLoaderData.detail);
  });
});
