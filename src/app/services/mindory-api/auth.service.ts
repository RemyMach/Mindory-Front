import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from '../../models/User.model';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {interval, Observable, throwError} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';

export interface LoginResponse {
  token: string;
}

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

    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, {email, password}, this.httpOptions)
      .pipe(
        tap(token => {
          if (token) {
            console.log(token);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return this.handleError<string>(err, 'There is an error with the login please retry later');
          })
      );
  }

  /*private subscribe(props: User): Observable<User> {

  }*/

  private handleError<T>(error: HttpErrorResponse, operation = 'operation', result?: T): Observable<T> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
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
    if (data.tken) {
      localStorage.setItem('token', data.token);
      return;
    }
  }
}
