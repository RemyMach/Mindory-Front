import {Injectable} from '@angular/core';
import {io} from 'socket.io-client/dist/socket.io';
import {Observable} from 'rxjs';
import {Card} from '../../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;
  readonly uri: string = 'http://localhost:3000/socket';
  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: string): Observable<Card>{
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    console.log(data);
    this.socket.emit(eventName, data);
  }
}
