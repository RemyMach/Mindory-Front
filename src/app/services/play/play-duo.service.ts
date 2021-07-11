import {Injectable} from '@angular/core';
import {RoomCreateService} from '../mindory-api/room/room-create.service';
import {Room} from '../../models/room.model';
import {RoomListUserService} from '../mindory-api/room/room-list-user.service';
import {SnackbarService} from '../snackbar.service';
import {Observable} from 'rxjs';
import {RoomValidService} from '../mindory-api/room/room-valid.service';
import {map, take} from 'rxjs/operators';
import {Deck} from '../../models/deck.model';
import {ListDeckService} from '../mindory-api/deck/list-deck.service';

@Injectable({
  providedIn: 'root'
})
export class PlayDuoService {
  room: Room;
  deck: Deck;
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
      data => this.room = data,
      error => console.log(error)
    );
  }

  public getActualDeck(): void {
    this.listDeckService.getDeckFromPartId(this.room.id).subscribe(
      data => this.deck = data,
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

  public validateToken(token: string): Observable<boolean> {
    return this.roomValidService.isValidToken(token).pipe(
      take(1),
      map(result => {
        return !!result;
      })
    );
  }
}
