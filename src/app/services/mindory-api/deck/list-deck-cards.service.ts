import {Injectable} from '@angular/core';
import {Deck} from '../../../models/deck.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DefaultErrorService} from '../error/default-error.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {PlaySoloService} from '../../play/play-solo.service';

@Injectable({
  providedIn: 'root'
})
export class ListDeckCardsService {
  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
  ) { }

  public getDeckWithCards(idDeck: number): Observable<Deck> {
    return this.http.get<Deck>(`http://localhost:3000/decks/play/${idDeck}`).pipe(
      tap(data => data),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<Deck>(err, 'Incorrect request');
      })
    );
  }
}
