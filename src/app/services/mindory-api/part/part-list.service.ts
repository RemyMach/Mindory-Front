import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {DefaultErrorService} from '../error/default-error.service';
import {LocalStorageService} from '../../local-storage.service';
import {Card} from '../../../models/card.model';
import {Observable} from 'rxjs';
import {Part} from '../../../models/part.model';
import {catchError, tap} from 'rxjs/operators';
import {HttpOptionsService} from '../../utils/http-options.service';

@Injectable({
  providedIn: 'root'
})
export class PartListService {

  private httpOptions: {headers: HttpHeaders};
  private baseUrl = 'http://localhost:3000/parts';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
    private localStorageService: LocalStorageService,
    private httpOptionsService: HttpOptionsService
  ) { }

  public getBetterPartForADeck(deckId: number): Observable<any> {
    this.httpOptions = this.httpOptionsService.generateHttpOptions();
    return this.http.get<Part>(`${this.baseUrl}/deck/${deckId}/better`,  this.httpOptions)
      .pipe(
        tap(data => data
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }
}
