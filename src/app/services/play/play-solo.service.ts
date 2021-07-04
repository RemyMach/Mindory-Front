import {Injectable, Renderer2} from '@angular/core';
import {Card, DisplayCard} from '../../models/card.model';
import {delay} from '../../utils/delay';
import {interval, Subscription} from 'rxjs';
import {ListDeckCardsService} from '../mindory-api/deck/list-deck-cards.service';
import {PartCreateService} from '../mindory-api/part/part-create.service';
import {Part} from '../../models/part.model';
import {SnackbarService} from '../snackbar.service';
import {ShotCreateService} from '../mindory-api/shot/shot-create.service';

@Injectable({
  providedIn: 'root'
})
export class PlaySoloService {
  NUMBER_CARD_COMPARE = 2;
  NUMBER_OF_PAIRS_TO_BE_FOUND = 15;
  cardsClicked: Set<Card> = new Set();
  listElementClicked: Set<HTMLDivElement> = new Set();
  listElementToRefresh: Set<HTMLDivElement> = new Set();
  gameStart = false;
  pairsFound = 0;
  time: Date = new Date(0);
  interval$: Subscription;
  part: Part;
  constructor(
    private listDeckCardsService: ListDeckCardsService,
    private partCreateService: PartCreateService,
    private snackBarService: SnackbarService,
    private shotCreatService: ShotCreateService
  ) { }

  public async clickOnCard(card: Card, element: HTMLDivElement): Promise<void> {
    if (this.cardsClicked.size < this.NUMBER_CARD_COMPARE) {
      if (card.displayCard === undefined) {
        card.displayCard = new DisplayCard(true);
      } else {
        card.displayCard.display = true;
      }
      this.addCardToTheGame(card, element);
      if (this.cardsClicked.size === this.NUMBER_CARD_COMPARE) {
        this.createShot();
        await this.compareCardsToSeeIfItsAMatch();
      }
    }
  }

  public startGameChronometer(): void {
    this.interval$ = interval(1000).subscribe((d) => {
      this.time = new Date(d + 1);
      this.time.setSeconds(d + 1);
    });
  }

  public stopGameChronometer(): void {
    this.interval$.unsubscribe();
  }

  public createPart(): void {
    this.partCreateService.create(this.listDeckCardsService.deck.Cards, this.listDeckCardsService.deck.id).subscribe(
      data => this.part = data,
      error => this.snackBarService.openSnackBar('Our services have a problem please retry later', 'OK', 'error')
    );
  }

  public createShot(): void {

    this.shotCreatService.create(this.cardsClicked, this.part.id, this.time.getSeconds()).subscribe(
      data => {},
      error  => this.snackBarService.openSnackBar('Our services have a problem please retry later', 'OK', 'error')
    );
  }

  private async compareCardsToSeeIfItsAMatch(): Promise<void> {
    const iterator = this.cardsClicked.values();
    const firstElement: Card = iterator.next().value;
    const secondElement: Card = iterator.next().value;
    if (this.itsNotAPair(firstElement, secondElement)) {
      await delay(2000);
      this.hideFrontOfTheCards();
    }else {
      this.pairsFound++;
    }
    for (const elementToRefresh of this.listElementClicked) {
      this.listElementToRefresh.add(elementToRefresh);
    }
    this.clearTheCurrentCard();
    if (this.gameIsFinished()) {
      // on a gagné
      this.stopGameChronometer();
    }
  }

  private itsNotAPair(cardA: Card, cardB: Card): boolean {
    return cardA.id !== cardB.cardAssociate.id;
  }

  private gameIsFinished(): boolean {
    return this.pairsFound === this.NUMBER_OF_PAIRS_TO_BE_FOUND;
  }

  private hideFrontOfTheCards(): void {
    for (const currentCard of this.cardsClicked) {
      currentCard.displayCard.display = false;
    }
  }

  private addCardToTheGame(card: Card, element: HTMLDivElement): void {
    this.cardsClicked.add(card);
    this.listElementClicked.add(element);
  }

  private clearTheCurrentCard(): void {
    this.cardsClicked.clear();
    this.listElementClicked.clear();
  }
}
