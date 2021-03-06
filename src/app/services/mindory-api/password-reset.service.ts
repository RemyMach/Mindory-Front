import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from '../local-storage.service';
import {DefaultErrorService} from './error/default-error.service';
import {Observable} from 'rxjs';
import {SessionModel} from '../../models/session.model';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private baseUrl = 'http://localhost:3000/passwordReset';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private defaultErrorService: DefaultErrorService,
  ) { }

  public forget(email: string): Observable<any> {

    return this.http.post<SessionModel>(`${this.baseUrl}/`, {email}, this.httpOptions)
      .pipe(
        tap(() => {
          return;
        }),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }

  public reset(token: string, password: string): Observable<any> {

    return this.http.put<SessionModel>(`${this.baseUrl}/`, {token, password}, this.httpOptions)
      .pipe(
        tap(() => {
          return;
        }),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, err.message);
        })
      );
  }

  public verifyPasswordResetToken(token: string): Observable<any> {

    return this.http.get(`${this.baseUrl}/${token}`, this.httpOptions)
      .pipe(
        tap(() => {
          return;
        }),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, err.message);
        })
      );
  }

  public change(oldPassword: string, newPassword: string, token: string): Observable<any> {
    this.setAuthorizationHeader(token);
    return this.http.put<SessionModel>(`${this.baseUrl}/change`, {oldPassword, newPassword}, this.httpOptions)
      .pipe(
        tap(() => {
          return;
        }),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, err.message);
        })
      );
  }

  private setAuthorizationHeader(token: string): void {
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${token}`);
  }
}
