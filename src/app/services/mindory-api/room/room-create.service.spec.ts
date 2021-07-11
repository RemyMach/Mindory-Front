import {TestBed} from '@angular/core/testing';

import {RoomCreateService} from './room-create.service';

describe('RoomCreateService', () => {
  let service: RoomCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
