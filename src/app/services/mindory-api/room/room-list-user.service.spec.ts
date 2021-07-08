import { TestBed } from '@angular/core/testing';

import { RoomListUserService } from './room-list-user.service';

describe('RoomListUserService', () => {
  let service: RoomListUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomListUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
