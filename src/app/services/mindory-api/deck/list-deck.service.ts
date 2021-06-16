import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subscriber} from 'rxjs';
import {Deck} from '../../../models/deck.model';
import {catchError, tap} from 'rxjs/operators';
import {DefaultErrorService} from '../error/default-error.service';
import {log} from 'util';
import {logger} from 'codelyzer/util/logger';

@Injectable({
  providedIn: 'root'
})
export class ListDeckService {
  public decksHome: Deck[];
  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
  ) { }

  private getDecks(offset: number, limit: number): Observable<Deck[]> {
    return this.http.get<Deck[]>(`http://localhost:3000/decks/all?offset=${offset}&limit=${limit}`).pipe(
      tap(data => data),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<Deck[]>(err, 'Incorrect request');
      })
    );
  }
  public getDecksFromHome(): void{
    this.getDecks(0, 3).subscribe(
      value => this.decksHome = value,
          err => console.log(err),
      () => console.log('on a finit ici')
    );
  }

}
