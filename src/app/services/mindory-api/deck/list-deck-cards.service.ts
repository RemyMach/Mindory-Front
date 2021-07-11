import {Injectable} from '@angular/core';
import {Deck} from '../../../models/deck.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DefaultErrorService} from '../error/default-error.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListDeckCardsService {

  public deck: Deck;
  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
  ) { }

  private getDeckWithCards(idDeck: number): Observable<Deck> {
    return this.http.get<Deck>(`http://localhost:3000/decks/play/${idDeck}`).pipe(
      tap(data => data),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<Deck>(err, 'Incorrect request');
      })
    );
  }
  public getDeck(idDeck: number): void{
    this.getDeckWithCards(idDeck).subscribe(
      value =>  this.deck = value,
      err => console.log(err),
      () => console.log('on a finit ici')
    );
  }
}
