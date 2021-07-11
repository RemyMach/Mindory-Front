import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.dev';
import {DefaultErrorService} from '../error/default-error.service';
import {Observable} from 'rxjs';
import {Part} from '../../../models/part.model';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomListUserService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: environment.BEARER_EXAMPLE as string })
  };
  private baseUrl = 'http://localhost:3000/rooms';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
  ) { }

  public get(): Observable<any> {
    return this.http.get<Part>(`${this.baseUrl}`,  this.httpOptions)
      .pipe(
        tap(data => data
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }
}
