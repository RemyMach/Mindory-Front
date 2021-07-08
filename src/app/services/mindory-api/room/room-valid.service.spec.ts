import { TestBed } from '@angular/core/testing';

import { RoomValidService } from './room-valid.service';

describe('RoomValidService', () => {
  let service: RoomValidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomValidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
