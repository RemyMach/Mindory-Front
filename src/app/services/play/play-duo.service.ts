import { Injectable } from '@angular/core';
import {RoomCreateService} from '../mindory-api/room/room-create.service';
import {Room} from '../../models/room.model';
import {RoomListUserService} from '../mindory-api/room/room-list-user.service';
import {SnackbarService} from '../snackbar.service';
import {interval, Observable, of, Subscription} from 'rxjs';
import {RoomValidService} from '../mindory-api/room/room-valid.service';
import {map, take, tap} from 'rxjs/operators';
import {Deck} from '../../models/deck.model';
import {ListDeckService} from '../mindory-api/deck/list-deck.service';
import {Part} from '../../models/part.model';
import {SocketService} from '../socket/socket.service';
import {environment} from '../../../environments/environment.dev';
import {calculateTimeInSeconds, getTimeInHourMinuteSecondsFormat} from '../../utils/Time/calculateTime';
import {Card, DisplayCard} from '../../models/card.model';
import {delay} from '../../utils/delay';
import {ShotCreateService} from '../mindory-api/shot/shot-create.service';
import {shuffleArray} from '../../utils/array/shuffle';

@Injectable({
  providedIn: 'root'
})
export class PlayDuoService {
  room: Room;
  deck: Deck;
  part: Part;
  buttonCreatePart = false;
  idUserWhoPlay: string;
  time: Date = new Date(0);
  interval$: Subscription;

  NUMBER_CARD_COMPARE = 2;
  NUMBER_OF_PAIRS_TO_BE_FOUND = 15;
  cardsClicked: Set<Card> = new Set();
  listElementClicked: Set<HTMLDivElement> = new Set();
  listElementToRefresh: Set<HTMLDivElement> = new Set();
  gameStart = false;
  pairsFound = 0;

  constructor(
    private roomCreateService: RoomCreateService,
    private roomListUserService: RoomListUserService,
    private snackBar: SnackbarService,
    private roomValidService: RoomValidService,
    public listDeckService: ListDeckService,
    private socketService: SocketService,
    private snackBarService: SnackbarService,
    private shotCreateService: ShotCreateService
  ) { }

  public async clickOnCard(card: Card, element: HTMLDivElement): Promise<void> {
    if (this.cardsClicked.size < this.NUMBER_CARD_COMPARE && this.socketService.socket.id === this.idUserWhoPlay) {
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

  public activateCardFromTheOtherUser(cardId: number): void {
    this.part.Cards.forEach(card => {
      if (card.id === cardId) {
        card.displayCard = {display: true};
      }
    });
    console.log(this.part.Cards);
  }
  public deactivateCardFromTheOtherUser(cardId: number): void {
    this.part.Cards.forEach(card => {
      if (card.id === cardId) {
        card.displayCard = {display: false};
      }
    });
  }

  public createShot(): void {

    this.shotCreateService.create(this.cardsClicked, this.part.id, calculateTimeInSeconds(this.time)).subscribe(
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
      this.stopGameChronometer();
      this.snackBarService.openSnackBar(`Felicitation vous avez gagnée en ${getTimeInHourMinuteSecondsFormat(this.time)}`, 'OK', 'Success');
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

  public createRoom(deckId: number): void {
    console.log('on passe ici');
    this.roomCreateService.create(deckId).subscribe(
      data => this.room = data,
      error => console.log(error)
    );
  }

  public getActualRoomAndInitiateStartOfTheGame(): void {
    this.roomListUserService.get().subscribe(
      data => {
        this.room = data;
        this.getActualDeck();
        this.initiateTheStartOfTheGame();
      },
      error => console.log(error)
    );
  }

  public getActualRoomWithoutSocket(): void {
    this.roomListUserService.get().subscribe(
      data => {
        this.room = data;
        this.getActualDeck();
      },
      error => console.log(error)
    );
  }

  public getActualDeck(): void {
    this.listDeckService.getDeckFromPartId(this.room.part.id).subscribe(
      data => {
        this.deck = data;
        shuffleArray(data.Parts[0].Cards, null);
        this.part = data.Parts[0];
        this.activateCardFromTheOtherUser(11);
      },
      error => console.log(error)
    );
  }

  public createKeywordForARoom(keyWord: string): void {
    this.roomCreateService.createKeyWordForExistingRoom(keyWord, this.room.id).subscribe(
      data => this.room = data,
      error => {
        this.snackBar.openSnackBar(error, 'OK', 'Error');
        this.buttonCreatePart = false;
      }
    );
  }

  public getIdFromTheFirstPlayer(): void {
    this.socketService.listenMessage('userWhoPlayInFirst').subscribe(
      data => {
        this.idUserWhoPlay = data;
      },
      err => console.log(err)
    );
  }

  private initiateTheStartOfTheGame(): void {
    const tokenBearerSplit = environment.BEARER_EXAMPLE.split(' ');
    this.socketService.connect(this.room.id, tokenBearerSplit[1]);
    this.getIdFromTheFirstPlayer();
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
}
