import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Card} from '../../../models/card.model';
import {DefaultErrorService} from '../error/default-error.service';
import {Part} from '../../../models/part.model';
import {environment} from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PartCreateService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: environment.BEARER_EXAMPLE as string })
  };
  private baseUrl = 'http://localhost:3000/parts';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
  ) { }

  public create(cards: Card[], deckId: number): Observable<any> {
    const cardIds: number[] = cards.map(card => card.id);
    return this.http.post<Part>(`${this.baseUrl}`, {cardIds, deckId}, this.httpOptions)
      .pipe(
        tap(data => data
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }
}
