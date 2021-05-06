import { TestBed } from '@angular/core/testing';

import { LoaderInterceptorsService } from './loader-interceptors.service';

describe('LoaderInterceptorsService', () => {
  let service: LoaderInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
