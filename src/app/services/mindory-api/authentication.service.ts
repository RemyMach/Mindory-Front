import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../../models/User.model';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';
import {SessionModel} from '../../models/session.model';
import {DefaultErrorService} from './error/default-error.service';
import {environment} from '../../../environments/environment.dev';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  tokenValue: string = '';

  httpOptionsAuthentified = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.localStorageService.getSessionToken() })
  };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  baseUrl = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private defaultErrorService: DefaultErrorService,
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
          return this.defaultErrorService.handleError<string>(err, 'Incorrect email ou/et mot de passe');
          })
      );
  }

  public verifyToken(): Observable<any> {
    return this.http.post(`${this.baseUrl}/token`, {} , this.httpOptionsAuthentified)
      .pipe(
        tap(data => data),
        catchError((err: HttpErrorResponse) => {
          if (this.localStorageService.session) {
            this.localStorageService.deleteSession();
          }
          return this.defaultErrorService.handleError<string>(err, 'Incorrect token');
        })
      );
  }

  public subscribe(props: UserModel): Observable<string | UserModel> {

    return this.http.post<UserModel>(`${this.baseUrl}/subscribe`, props, this.httpOptions)
      .pipe(
        tap(data => {
          if (data) {
            this.saveUser(data);
            return data;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, err.message);
        })
      );
  }
  private saveUser(data): void {
    if (data.username) {
      this.localStorageService.setUser(data);
      return;
    }
  }

  private saveToken(data): void {
    if (data.token) {
      this.localStorageService.setSession({token: data.token});
    }
  }
}
