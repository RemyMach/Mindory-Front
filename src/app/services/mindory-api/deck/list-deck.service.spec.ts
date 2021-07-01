import {TestBed} from '@angular/core/testing';

import {ListDeckService} from './list-deck.service';

describe('ListDeckService', () => {
  let service: ListDeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
