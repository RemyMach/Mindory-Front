import {Shot} from './shot.model';
import {Deck} from './deck.model';
import {Card} from './card.model';

export interface Part {
  id?: number;
  time?: number;
  deck?: Deck;
  Cards?: Card[];
  Shots?: Shot[];
}

