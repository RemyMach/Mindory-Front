import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Deck} from '../../../models/deck.model';
import {catchError, tap} from 'rxjs/operators';
import {DefaultErrorService} from '../error/default-error.service';
import {SnackbarService} from '../../snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ListDeckService {
  public decksHome: Deck[];
  public decks: Deck[];
  private baseUrl = 'http://localhost:3000/decks';
  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
    private snackBarService: SnackbarService
  ) { }

  private getDecks(offset: number, limit: number, minCard: number = 0): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${this.baseUrl}/all?offset=${offset}&limit=${limit}&minCard=${minCard}`).pipe(
      tap(data => data),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<Deck[]>(err, 'Incorrect request');
      })
    );
  }

  public getDeckFromPartId(partId: number): Observable<Deck> {
    return this.http.get<Deck>(`${this.baseUrl}/part/${partId}`).pipe(
      tap(data => data),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<Deck>(err, 'Incorrect request');
      })
    );
  }

  public deleteDeck(deckId: number): void
  {
    this.decks = this.decks.filter(deck => {
      return deck.id !== deckId;
    });

    this.http.delete<string>(`${this.baseUrl}/${deckId}`).pipe(
      tap(() => this.snackBarService.openSnackBar('Ce deck a bien été supprimé', 'OK', 'Success')),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<string>(err, 'Incorrect request');
      })
    ).subscribe(
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
}
