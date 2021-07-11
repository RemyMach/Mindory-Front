import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.dev';
import {DefaultErrorService} from '../error/default-error.service';

@Injectable({
  providedIn: 'root'
})
export class RoomValidService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: environment.BEARER_EXAMPLE as string })
  };
  private baseUrl = 'http://localhost:3000/rooms/token';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
  ) { }

  public isValidToken(token: string): Observable<any> {
    return this.http.get<boolean>(`${this.baseUrl}/${token}`,  this.httpOptions)
      .pipe(
        tap(data => data
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }
}
