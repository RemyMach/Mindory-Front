import { TestBed } from '@angular/core/testing';

import { DefaultErrorService } from './default-error.service';

describe('DefaultErrorService', () => {
  let service: DefaultErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
