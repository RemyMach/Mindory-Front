import { TestBed } from '@angular/core/testing';

import { CardPlayStatusService } from './card-play-status.service';

describe('CardPlayStatusService', () => {
  let service: CardPlayStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardPlayStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
