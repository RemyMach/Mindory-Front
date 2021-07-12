import {TestBed} from '@angular/core/testing';

import {PartCreateService} from './part-create.service';

describe('PartCreateService', () => {
  let service: PartCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
