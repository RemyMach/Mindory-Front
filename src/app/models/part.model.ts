import {Shot} from './shot.model';
import {Deck} from './deck.model';

export interface Part {
  id?: number;
  time?: number;
  deck?: Deck;
  Shots?: Shot[];
}

