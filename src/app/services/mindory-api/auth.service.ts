import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../../models/User.model';
import {catchError, map, retry, tap} from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';
import {SessionModel} from '../../models/session.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  baseUrl = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public login(email: string, password: string): Observable<any> {

    return this.http.post<SessionModel>(`${this.baseUrl}/login`, {email, password}, this.httpOptions)
      .pipe(
        tap(data => {
          if (data) {
            this.saveToken(data);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return this.handleError<string>(err, 'Incorrect email ou/et mot de passe');
          })
      );
  }

  /*private subscribe(props: UserModel): Observable<User> {

  }*/

  private handleError<T>(error: HttpErrorResponse, operation = 'operation', result?: T): Observable<T> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError('Mindory have a problem please retry later');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(operation);
  }

  private saveToken(data): void {
    if (data.token) {
      this.localStorageService.setSession({token: data.token});
      return;
    }
  }
}
