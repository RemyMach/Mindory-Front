import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.dev';
import {DefaultErrorService} from '../error/default-error.service';
import {Observable} from 'rxjs';
import {Part} from '../../../models/part.model';
import {catchError, tap} from 'rxjs/operators';
import {LocalStorageService} from '../../local-storage.service';
import {HttpOptionsService} from '../../utils/http-options.service';

@Injectable({
  providedIn: 'root'
})
export class RoomListUserService {

  private httpOptions: {
    headers: HttpHeaders
  };
  private baseUrl = 'http://localhost:3000/rooms';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
    private localStorageService: LocalStorageService,
    private httpOptionsService: HttpOptionsService
  ) { }

  public get(): Observable<any> {
    this.httpOptions = this.httpOptionsService.generateHttpOptions();
    this.localStorageService.getSessionToken();
    return this.http.get<Part>(`${this.baseUrl}`,  this.httpOptions)
      .pipe(
        tap(data => data
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }

  public getForAnonymous(token: string): Observable<any> {
    this.httpOptions = this.httpOptionsService.generateHttpOptions();
    this.localStorageService.getSessionToken();
    return this.http.get<Part>(`${this.baseUrl}?token=${token}`,  this.httpOptions)
      .pipe(
        tap(data => data
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }
}
