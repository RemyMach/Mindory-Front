import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client/dist/socket.io';
import { Observable, Subscriber } from 'rxjs';
import {Card} from '../../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket;
  readonly uri: string = 'http://localhost:3000';
  constructor() {
  }

  disconnect(): void {
    this.socket.emit('disconnectCustom');
  }
  connect(roomId: number, sessionToken?: string): void {
    this.socket = io(this.uri, { transports: ['websocket', 'polling', 'flashsocket'], query: {
        room: roomId, userToken: sessionToken
      }});
  }

  listen(eventName: string): Observable<Card>{
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
  listenActivateCard(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on('activateCard', (data) => {
        subscriber.next(data);
      });
    });
  }
  listenMessage(eventName: string): Observable<string>{
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
  listenPairOfCards(eventName: string): Observable<{card_id_a: number, card_id_b: number}> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: {card_id_a: number, card_id_b: number}) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any): void {
    console.log(data);
    this.socket.emit(eventName, data);
  }

}
