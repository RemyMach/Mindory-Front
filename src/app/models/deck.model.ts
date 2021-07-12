import {Card} from './card.model';

export interface Deck {
  id: number;
  title: string;
  image: string;
  count: number;
  Cards?: Card[];
}
