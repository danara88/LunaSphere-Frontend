import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import {
  LoaderData,
  LoaderTypeEnum,
} from '@/shared/components/luna-sphere-loader/models/luna-sphere-loader.model';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not dismiss loader and assign loader data', () => {
    const mockLoaderData = {
      title: 'Test Loader Title',
      detail: 'Test Loader Detail',
      type: LoaderTypeEnum.MODAL_SCREEN,
    } as LoaderData;
    service.showLoader(mockLoaderData);
    expect(service.data()).toEqual(mockLoaderData);
    expect(service.dismissLoader()).toBeFalse();
  });

  it('should dismiss loader and clear loader data', () => {
    service.hideLoader();
    expect(service.dismissLoader()).toBeTrue();
    expect(service.data()).toBeUndefined();
  });
});
