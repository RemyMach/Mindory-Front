import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Card} from '../../../models/card.model';
import {DefaultErrorService} from '../error/default-error.service';
import {Shot} from '../../../models/shot.model';
import {environment} from '../../../../environments/environment.dev';
import {LocalStorageService} from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShotCreateService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.localStorageService.getSessionToken() })
  };
  private baseUrl = 'http://localhost:3000/shots';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
    private localStorageService: LocalStorageService
  ) { }

  public create(cards: Set<Card>, partId: number, time: number): Observable<any> {
    const cardIds: number[] = [];
    cards.forEach(card => cardIds.push(card.id));
    return this.http.post<Shot>(`${this.baseUrl}`, {cardIds, partId, time}, this.httpOptions)
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
