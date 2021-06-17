import { Injectable } from '@angular/core';
import {Card, DisplayCard} from '../../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class PlaySoloService {
  cardsClicked: Card[] = [];
  constructor() { }
  public clickOnCard(card: Card): void {
    if (this.cardsClicked.length === 0) {
      this.cardsClicked.push(card);
      if (card.displayCard === undefined) {
        card.displayCard = new DisplayCard(true);
      } else {
        card.displayCard.display = true;
      }
    }else {
      this.cardsClicked[0].displayCard.display = false;
      this.cardsClicked = [];
    }
  }
}
