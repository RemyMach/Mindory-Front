import {Injectable, Renderer2} from '@angular/core';
import {Card, DisplayCard} from '../../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class PlaySoloService {
  cardsClicked: Set<Card> = new Set();
  listElementClicked: Set<HTMLDivElement> = new Set();
  listElementToRefresh: Set<HTMLDivElement> = new Set();
  constructor() { }
  public clickOnCard(card: Card, element: HTMLDivElement): void {
    if (this.cardsClicked.size <= 1) {
      if (card.displayCard === undefined) {
        card.displayCard = new DisplayCard(true);
      } else {
        card.displayCard.display = true;
      }
      this.cardsClicked.add(card);
      this.listElementClicked.add(element);
    }else {
      const iterator = this.cardsClicked.values();
      const firstElement: Card = iterator.next().value;
      const secundElement: Card = iterator.next().value;
      console.log(firstElement);
      console.log(secundElement);
      if (firstElement.id !== secundElement.cardAssociate.id) {
        for (const currentCard of this.cardsClicked) {
          currentCard.displayCard.display = false;
        }
      }
      for (const elementToRefresh of this.listElementClicked) {
        this.listElementToRefresh.add(elementToRefresh);
      }
      this.cardsClicked.clear();
      this.listElementClicked.clear();
    }
  }
}
