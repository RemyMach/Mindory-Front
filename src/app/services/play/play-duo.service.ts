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
import {DialogConfirmationService} from '../dialog-confirmation.service';
import {LocalStorageService} from '../local-storage.service';
import {PartCreateService} from '../mindory-api/part/part-create.service';
import {CardPlayStatusService} from '../mindory-api/card/card-play-status.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PartListService} from '../mindory-api/part/part-list.service';

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
  dialogOptions;
  usersConnected =  false;

  NUMBER_CARD_COMPARE = 2;
  NUMBER_OF_PAIRS_TO_BE_FOUND = 15;
  cardsClicked: Set<Card> = new Set();
  listElementClicked: Set<HTMLDivElement> = new Set();
  listElementToRefresh: Set<HTMLDivElement> = new Set();
  gameStart = false;
  pairsFoundByMe = 0;
  pairsFoundByOther = 0;
  betterPartTime: Date;

  constructor(
    private roomCreateService: RoomCreateService,
    private roomListUserService: RoomListUserService,
    private snackBar: SnackbarService,
    private roomValidService: RoomValidService,
    public listDeckService: ListDeckService,
    private socketService: SocketService,
    private snackBarService: SnackbarService,
    private shotCreateService: ShotCreateService,
    private dialogConfirmationService: DialogConfirmationService,
    private localStorageService: LocalStorageService,
    private partCreateService: PartCreateService,
    private cardPlayStatusService: CardPlayStatusService,
    private partListService: PartListService

  ) { }

  public async clickOnCard(card: Card, element: HTMLDivElement): Promise<void> {
    if (this.cardsClicked.size < this.NUMBER_CARD_COMPARE && this.socketService.socket.id === this.idUserWhoPlay) {
      if (card.displayCard === undefined) {
        card.displayCard = new DisplayCard(true);
      } else {
        card.displayCard.display = true;
      }
      this.socketService.emit('cardReturn', card.id);
      this.addCardToTheGame(card, element);
      if (this.cardsClicked.size === this.NUMBER_CARD_COMPARE) {
        if (this.localStorageService.getSessionToken() && this.usersConnected) {
          this.createShot();
        }
        await this.compareCardsToSeeIfItsAMatch();
      }
    }
  }

  public activateCard(cardId: string): void {
    const id = (+cardId);
    this.part.Cards.forEach(card => {
      if (card.id === id) {
        card.displayCard = {display: true};
      }
    });
  }
  public deactivateCard(cardId: number): void {
    this.part.Cards.forEach(card => {
      if (card.id === cardId) {
        card.displayCard = {display: false};
      }
    });
  }
  public incrementOtherPairNumber(): void {
    this.pairsFoundByOther++;
  }

  public createShot(): void {

    this.shotCreateService.create(this.cardsClicked, this.part.id, calculateTimeInSeconds(this.time)).subscribe(
      data => {console.log(`mes points ${this.pairsFoundByMe}, tes points ${this.pairsFoundByOther}`); },
      error  => this.snackBarService.openSnackBar('Our services have a problem please retry later', 'OK', 'error')
    );
  }

  private async compareCardsToSeeIfItsAMatch(): Promise<void> {
    const iterator = this.cardsClicked.values();
    const firstElement: Card = iterator.next().value;
    const secondElement: Card = iterator.next().value;
    if (this.itsNotAPair(firstElement, secondElement)) {
      await delay(2000);
      this.socketService.emit('hideCards', {card_id_a: firstElement.id, card_id_b: secondElement.id});
      this.hideFrontOfTheCards();
    }else {
      this.pairsFoundByMe++;
      this.socketService.emit('pairFound', '');
    }
    for (const elementToRefresh of this.listElementClicked) {
      this.listElementToRefresh.add(elementToRefresh);
    }
    this.clearTheCurrentCard();
    if (this.gameIsFinished()) {
      this.socketService.emit('gameFinished', '');
      const endMessage = this.pairsFoundByMe > this.pairsFoundByOther ? 'victory' : 'defeat';
      this.endGame(endMessage);
    }
  }

  private endGame(message: 'victory' | 'defeat'): void {
    this.stopGameChronometer();
    if (message === 'victory')
      this.snackBarService.openSnackBar(`Felicitation vous avez gagn??`, 'OK', 'Success');
    else
      this.snackBarService.openSnackBar(`Votre adversaire a gagn??`, 'OK', 'Error');
  }

  private itsNotAPair(cardA: Card, cardB: Card): boolean {
    return cardA.id !== cardB.cardAssociate.id;
  }


  private gameIsFinished(): boolean {
    return this.pairsFoundByMe + this.pairsFoundByOther === this.NUMBER_OF_PAIRS_TO_BE_FOUND;
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
    this.roomCreateService.create(deckId).subscribe(
      data => this.room = data,
      error => console.log(error)
    );
  }

  public getActualRoomAndInitiateStartOfTheGame(): void {
    this.roomListUserService.get().subscribe(
      data => {
        console.log(data);
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
        this.getActualDeckForCreation();
      },
      error => console.log(error)
    );
  }

  public getActualRoomForAnonymous(token: string): void {

    this.roomListUserService.getForAnonymous(token).subscribe(
      data => {
        console.log(data);
        this.room = data;
        this.getActualDeck();
        this.initiateTheStartOfTheGameForAnonymous();
      },
      error => console.log(error)
    );
  }

  private addUserToAPart(): void {
    this.partCreateService.addUserToAPart(this.deck.Parts[0].id).subscribe(
      data => data,
      error => console.log(error)
    );
  }

  private getPlayStatus(): void {
    this.cardPlayStatusService.getPairAndPoints(this.deck.Parts[0].id).subscribe(
      data => {
        this.pairsFoundByMe = data.myPoints;
        this.pairsFoundByOther = data.oponnentPoints;
        this.part.Cards.forEach(card => {
          if (data.cards.includes(card.id)) {
            card.displayCard = {display: true};
          }
        });
      },
      error => console.log(error)
    );
  }

  private getActualDeckForCreation(): void {
    this.listDeckService.getDeckFromPartId(this.room.part.id).subscribe(
      data => {
        this.deck = data;
        shuffleArray(data.Parts[0].Cards, null);
        this.part = data.Parts[0];
      },
      error => console.log(error)
    );
  }

  public getActualDeck(): void {
    this.listDeckService.getDeckFromPartId(this.room.part.id).subscribe(
      data => {
        this.deck = data;
        if (this.localStorageService.getSessionToken()) {
          this.getBetterPart();
          this.addUserToAPart();
          this.getPlayStatus();
        }
        shuffleArray(data.Parts[0].Cards, null);
        this.part = data.Parts[0];
      },
      error => console.log(error)
    );
  }

  public createKeywordForARoom(keyWord: string): void {
    this.roomCreateService.createKeyWordForExistingRoom(keyWord, this.room.id).subscribe(
      data => {
        this.room = data;
        this.snackBar.openSnackBar(`Vous avez bien cr??er un nouveau mot de passe custom`, 'OK', 'Success');
        this.getActualRoomWithoutSocket();
      },
      error => {
        this.snackBar.openSnackBar(error, 'OK', 'Error');
        this.buttonCreatePart = false;
      }
    );
  }
  private getBetterPart(): void {
    this.partListService.getBetterPartForADeck(this.deck.id).subscribe(
      data => {
        this.betterPartTime = new Date(0);
        this.betterPartTime.setUTCSeconds(data.time);
      },
      error => console.log(error)
    );
  }

  private initiateTheStartOfTheGame(): void {
    const tokenBearerSplit = this.localStorageService.getSessionToken().split(' ');
    this.socketService.connect(this.room.id, tokenBearerSplit[1]);
    this.getIdFromTheFirstPlayer();
    this.getTheMessageIfUsersAreAuthentified();
    this.getTheMessageIfUsersAreNotAuthentified();
    this.activateCardFromTheOtherUser();
    this.hideCardsFromTheOtherUser();
    this.pairFoundByOther();
    this.switchActivePlayer();
    this.gameFinished();
    this.otherUserIsDisconnected();
  }

  private initiateTheStartOfTheGameForAnonymous(): void {
    this.socketService.connect(this.room.id);
    this.getIdFromTheFirstPlayer();
    this.getTheMessageIfUsersAreAuthentified();
    this.getTheMessageIfUsersAreNotAuthentified();
    this.activateCardFromTheOtherUser();
    this.hideCardsFromTheOtherUser();
    this.pairFoundByOther();
    this.switchActivePlayer();
    this.gameFinished();
    this.otherUserIsDisconnected();
  }

  private getIdFromTheFirstPlayer(): void {
    this.socketService.listenMessage('userWhoPlayInFirst').subscribe(
      data => {
        this.idUserWhoPlay = data;
      },
      err => console.log(err)
    );
  }

  private getTheMessageIfUsersAreAuthentified(): void {
    this.socketService.listenMessage('UsersAreAuthentified').subscribe(
      data => {
        this.dialogOptions = {
          title: 'Message Informatif',
          subTitle: 'Vous ??tes tous les deux connect??s',
          message: `Vous pouvez donc refresh la page tant que la partie n'est pas finit m??me apr??s son d??but ou revenir sur le lien pour finir la partie plus tard sans rencontrer de probl??mes`,
          confirmText: 'Ok'
        };
        this.usersConnected = true;
        this.dialogConfirmationService.open(this.dialogOptions);
      },
      err => console.log(err)
    );
  }

  private getTheMessageIfUsersAreNotAuthentified(): void {
    this.socketService.listenMessage('UsersAreNotAuthentified').subscribe(
      data => {
        this.dialogOptions = {
          title: 'Message Informatif',
          subTitle: 'Vous n\'??tes pas tous les deux connect??s',
          message: `Vous ne pouvez donc pas actualiser la page o?? la quitter sinon une nouvelle partie commencera`,
          confirmText: 'Ok'
        };
        this.usersConnected = false;
        this.dialogConfirmationService.open(this.dialogOptions);
      },
      err => console.log(err)
    );
  }

  private activateCardFromTheOtherUser(): void {
    this.socketService.listenActivateCard().subscribe(
      data => {
        console.log(data);
        if (!this.gameStart) {
          this.startGameChronometer();
        }
        this.activateCard(data);
      },
      err => console.log(err)
    );
  }
  private hideCardsFromTheOtherUser(): void {
    this.socketService.listenPairOfCards('hideCards').subscribe(
      data => {
        this.deactivateCard(data.card_id_a);
        this.deactivateCard(data.card_id_b);
      }
    );
  }

  private pairFoundByOther(): void {
    this.socketService.listenMessage('pairFoundByOther').subscribe(
      _ => {
        this.incrementOtherPairNumber();
      }
    );
  }

  private switchActivePlayer(): void {
    this.socketService.listenMessage('switchActivePlayer').subscribe(
      data => {
        this.idUserWhoPlay = data;
      },
      err => console.log(err)
    );
  }
  private gameFinished(): void {
    this.socketService.listenMessage('gameFinished').subscribe(
      data => {
        const endMessage = this.pairsFoundByMe > this.pairsFoundByOther ? 'victory' : 'defeat';
        this.endGame(endMessage);
      },
      err => console.log(err)
    );
  }

  private otherUserIsDisconnected(): void {
    this.socketService.listenMessage('otherUserDisconnected').subscribe(
      data => {
        this.stopGameChronometer();
        this.snackBar.openSnackBar(`L'autre utilisateur c'est d??connect??`, 'OK', 'Success');
      },
      err => console.log(err)
    );
  }

  public startGameChronometer(): void {
    this.gameStart = true;
    this.interval$ = interval(1000).subscribe((d) => {
      this.time = new Date(d + 1);
      this.time.setSeconds(d + 1);
    });
  }

  public stopGameChronometer(): void {
    this.gameStart = false;
    this.interval$.unsubscribe();
  }
}
