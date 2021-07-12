import {TestBed} from '@angular/core/testing';

import {ListDeckCardsService} from './list-deck-cards.service';

describe('ListDeckCardsService', () => {
  let service: ListDeckCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDeckCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
