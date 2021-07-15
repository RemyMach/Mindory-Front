import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {DefaultErrorService} from '../error/default-error.service';
import {LocalStorageService} from '../../local-storage.service';
import {Part} from '../../../models/part.model';
import {catchError, tap} from 'rxjs/operators';
import {Card} from '../../../models/card.model';
import {CardPlayTypes} from './types/card-play-types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardPlayStatusService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.localStorageService.getSessionToken() })
  };
  private baseUrl = 'http://localhost:3000/cards';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
    private localStorageService: LocalStorageService
  ) { }

  public getPairAndPoints(partId: number): Observable<CardPlayTypes> {
    return this.http.get<CardPlayTypes>(`${this.baseUrl}/parts/${partId}/pair`, this.httpOptions)
      .pipe(
        tap(data => data
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<CardPlayTypes>(err, 'Please retry later');
        })
      );
  }
}
