import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SessionModel} from '../../../models/session.model';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Card} from '../../../models/card.model';
import {LocalStorageService} from '../../local-storage.service';
import {DefaultErrorService} from '../error/default-error.service';

@Injectable({
  providedIn: 'root'
})
export class PartCreateService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJpYXQiOjE2MjUzMDczMjV9.pn9kHCLg5haneHSOXiGozJkis7JvXtNoT-HY2AXkpog' })
  };
  private baseUrl = 'http://localhost:3000/parts';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
  ) { }

  public create(cards: Card[], deckId: number): Observable<any> {
    const cardIds: number[] = cards.map(card => card.id);
    return this.http.post<SessionModel>(`${this.baseUrl}`, {cardIds, deckId}, this.httpOptions)
      .pipe(
        tap(data => {
          return;
        }),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }
}
