import { Injectable } from '@angular/core';
import {RoomCreateService} from '../mindory-api/room/room-create.service';
import {Room} from '../../models/room.model';
import {RoomListUserService} from '../mindory-api/room/room-list-user.service';
import {SnackbarService} from '../snackbar.service';
import {Observable, of, Subscription} from 'rxjs';
import {RoomValidService} from '../mindory-api/room/room-valid.service';
import {map, take, tap} from 'rxjs/operators';
import {Deck} from '../../models/deck.model';
import {ListDeckService} from '../mindory-api/deck/list-deck.service';
import {Part} from '../../models/part.model';

@Injectable({
  providedIn: 'root'
})
export class PlayDuoService {
  room: Room;
  deck: Deck;
  part: Part;
  buttonCreatePart = false;

  constructor(
    private roomCreateService: RoomCreateService,
    private roomListUserService: RoomListUserService,
    private snackBar: SnackbarService,
    private roomValidService: RoomValidService,
    public listDeckService: ListDeckService,
  ) { }

  public createRoom(deckId: number): void {
    console.log('on passe ici');
    this.roomCreateService.create(deckId).subscribe(
      data => this.room = data,
      error => console.log(error)
    );
  }

  public getActualRoom(): void {
    this.roomListUserService.get().subscribe(
      data => {
        this.room = data;
        this.getActualDeck();
      },
      error => console.log(error)
    );
  }

  public getActualDeck(): void {
    console.log(this.room);
    this.listDeckService.getDeckFromPartId(this.room.part.id).subscribe(
      data => {
        this.deck = data;
        this.part = data.Parts[0];
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
}
