import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Deck} from '../../../models/deck.model';
import {catchError, tap} from 'rxjs/operators';
import {DefaultErrorService} from '../error/default-error.service';
import {SnackbarService} from '../../snackbar.service';
import {Card} from '../../../models/card.model';
import {LocalStorageService} from '../../local-storage.service';
import {HttpOptionsService} from '../../utils/http-options.service';

@Injectable({
  providedIn: 'root'
})
export class ListDeckService {

  private httpOptions = {
    headers: new HttpHeaders({ Authorization: this.localStorageService.getSessionToken() })
  };

  public decksHome: Deck[];
  public decks: Deck[];
  public deck: Deck;
  private deckBaseUrl = 'http://localhost:3000/decks';
  private cardBaseUrl = 'http://localhost:3000/cards';
  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
    private snackBarService: SnackbarService,
    private localStorageService: LocalStorageService,
    private httpOptionsService: HttpOptionsService
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

  public deleteDeck(deckId: number): Observable<string>
  {
    this.decks = this.decks.filter(deck => {
      return deck.id !== deckId;
    });

    this.httpOptions = this.httpOptionsService.generateHttpOptions();
    return this.http.delete<string>(`${this.deckBaseUrl}/${deckId}`, this.httpOptions).pipe(
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
  public callCreateCard(text: string, image: Blob, pairId: number): Observable<string> {
    if (text !== undefined) {
      const formData = new FormData();
      formData.set('text', text);
      formData.set('deckId', this.deck.id.toString());
      if (pairId !== undefined) {
        formData.set('cardAssociateId', pairId.toString());
      }
      return this.http.post<string>(`${this.cardBaseUrl}/`, formData, this.httpOptions).pipe(
        tap(() => this.snackBarService.openSnackBar('Cette carte a bien été ajoute', 'OK', 'Success')),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Incorrect request');
        })
      );
    }
    if (image !== undefined) {
      const formData = new FormData();
      formData.set('image', image);
      formData.set('deckId', this.deck.id.toString());
      if (pairId !== undefined) {
        formData.set('cardAssociateId', pairId.toString());
      }
      return this.http.post<string>(`${this.cardBaseUrl}/`, formData, this.httpOptions).pipe(
        tap(() => {
            this.snackBarService.openSnackBar('Cette carte a bien été ajoute', 'OK', 'Success');
          }
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Incorrect request');
        })
      );
    }
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
      err => console.log(err)
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
  public createCards(textA: string, imageA: Blob, textB: string, imageB: Blob): void {
    this.callCreateCard(textA, imageA, undefined).subscribe(
      value => {
        this.callCreateCard(textB, imageB, JSON.parse(JSON.stringify(value)).id).subscribe(
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }
}
