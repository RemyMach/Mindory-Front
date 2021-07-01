import {TestBed} from '@angular/core/testing';

import {PlaySoloService} from './play-solo.service';

describe('PlaySoloService', () => {
  let service: PlaySoloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaySoloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
