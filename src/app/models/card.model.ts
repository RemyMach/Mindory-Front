export interface DisplayCardProps {
  display: boolean;
}

export interface Card {
  id: number;
  text?: string;
  image?: string;
  displayCard?: DisplayCard;
  cardAssociate: Card;
}

export class DisplayCard implements DisplayCardProps {
  display: boolean;
  constructor(displayCard: boolean) {
    this.display = displayCard;
  }
}
