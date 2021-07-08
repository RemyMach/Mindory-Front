import { Injectable } from '@angular/core';
import {RoomCreateService} from '../mindory-api/room/room-create.service';
import {Room} from '../../models/room.model';
import {RoomListUserService} from '../mindory-api/room/room-list-user.service';
import {SnackbarService} from '../snackbar.service';
import {Observable, of, Subscription} from 'rxjs';
import {RoomValidService} from '../mindory-api/room/room-valid.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayDuoService {
  room: Room;
  buttonCreatePart = false;

  constructor(
    private roomCreateService: RoomCreateService,
    private roomListUserService: RoomListUserService,
    private snackBar: SnackbarService,
    private roomValidService: RoomValidService
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
        console.log(result);
        if (result) {
          return true;
        }else{
          return false;
        }
      })
    );
  }
}
