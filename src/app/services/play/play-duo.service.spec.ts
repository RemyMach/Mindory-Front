import {TestBed} from '@angular/core/testing';

import {PlayDuoService} from './play-duo.service';

describe('PlayDuoService', () => {
  let service: PlayDuoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayDuoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
