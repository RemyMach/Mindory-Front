import { TestBed } from '@angular/core/testing';

import { RoomJoinService } from './room-join.service';

describe('RoomJoinService', () => {
  let service: RoomJoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomJoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
