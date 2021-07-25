import {TestBed} from '@angular/core/testing';

import {LoaderInterceptorService} from './loader-interceptors.service';

describe('LoaderInterceptorsService', () => {
  let service: LoaderInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
