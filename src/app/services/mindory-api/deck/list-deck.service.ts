import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Deck} from '../../../models/deck.model';
import {catchError, tap} from 'rxjs/operators';
import {DefaultErrorService} from '../error/default-error.service';
import {SnackbarService} from '../../snackbar.service';
import {Card} from '../../../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class ListDeckService {
  public decksHome: Deck[];
  public decks: Deck[];
  public deck: Deck;
  private deckBaseUrl = 'http://localhost:3000/decks';
  private cardBaseUrl = 'http://localhost:3000/cards';
  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
    private snackBarService: SnackbarService
  ) { }

  private getDecks(offset: number, limit: number, minCard: number = 0): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${this.deckBaseUrl}/all?offset=${offset}&limit=${limit}&minCard=${minCard}`).pipe(
      tap(data => data),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<Deck[]>(err, 'Incorrect request');
      })
    );
  }

  public getDeckFromPartId(partId: number): Observable<Deck> {
    return this.http.get<Deck>(`${this.deckBaseUrl}/part/${partId}`).pipe(
      tap(data => data),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<Deck>(err, 'Incorrect request');
      })
    );
  }
  public callGetDeck(deckId: number): Observable<Deck> {
    return this.http.get<Deck>(`${this.deckBaseUrl}/${deckId}`).pipe(
      tap(data => data),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<Deck>(err, 'Incorrect request');
      })
    );
  }

  public callDeleteDeck(deckId: number): Observable<string> {
    return this.http.delete<string>(`${this.deckBaseUrl}/${deckId}`).pipe(
      tap(() => this.snackBarService.openSnackBar('Ce deck a bien été supprimé', 'OK', 'Success')),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<string>(err, 'Incorrect request');
      })
    );
  }
  public callDeleteCard(cardId: number): Observable<string> {
    return this.http.delete<string>(`${this.cardBaseUrl}/${cardId}`).pipe(
      tap(() => this.snackBarService.openSnackBar('Cette carte a bien été supprimé', 'OK', 'Success')),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<string>(err, 'Incorrect request');
      })
    );
  }
  public callCreateCard(text: string, image: any): Observable<string> {
    if (text !== undefined) {
      return this.http.post<string>(`${this.cardBaseUrl}/`, {text, deckId: this.deck.id}).pipe(
        tap(() => this.snackBarService.openSnackBar('Cette carte a bien été ajoute', 'OK', 'Success')),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Incorrect request');
        })
      );
    }
    if (image !== undefined) {
      console.log(image);
      return this.http.post<string>(`${this.cardBaseUrl}/`, {image, deckId: this.deck.id}).pipe(
        tap(() => this.snackBarService.openSnackBar('Cette carte a bien été ajoute', 'OK', 'Success')),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Incorrect request');
        })
      );
    }
  }

  public deleteDeck(deckId: number): void
  {
    this.decks = this.decks.filter(deck => {
      return deck.id !== deckId;
    });
    this.callDeleteDeck(deckId).subscribe(
      value => console.log(value),
      err => console.log(err)
    );
  }

  public getDecksFromHome(minCard: number = 0): void{
    this.getDecks(0, 3, minCard).subscribe(
      value => this.decksHome = value,
          err => console.log(err),
      () => console.log('on a finit ici')
    );
  }
  public getAllDecks(offset: number, limit: number): void {
    this.getDecks(offset, limit).subscribe(
      value => this.decks = value,
      err => console.log(err),
      () => console.log('on a finit ici')
    );
  }
  public getDeck(deckId: number): void {
    this.callGetDeck(deckId).subscribe(
      value => this.deck = value,
      error => console.log(error),
      () => this.deck
    );
  }
  public deleteCards(cards: Card[]): void {
    for (const card of cards) {
      this.callDeleteCard(card.id).subscribe(
        error => console.log(error)
      );
    }
  }
  public createCard(text: string, image: any): void {
    this.callCreateCard(text, image).subscribe(
      error => console.log(error)
    );
  }
}
