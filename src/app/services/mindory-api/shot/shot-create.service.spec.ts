import { TestBed } from '@angular/core/testing';

import { ShotCreateService } from './shot-create.service';

describe('ShotCreateService', () => {
  let service: ShotCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShotCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
