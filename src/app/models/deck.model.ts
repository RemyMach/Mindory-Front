import {Card} from './card.model';
import {Part} from './part.model';

export interface Deck {
  id: number;
  title: string;
  image: string;
  Cards?: Card[];
  Parts?: Part[];
}
