import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not dismiss loader', () => {
    service.showLoader();
    expect(service.dismissLoader).toBeFalse();
  });

  it('should dismiss loader', () => {
    service.hideLoader();
    expect(service.dismissLoader).toBeTrue();
  });
});
