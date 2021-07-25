import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../../models/User.model';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';
import {SessionModel} from '../../models/session.model';
import {DefaultErrorService} from './error/default-error.service';
import {HttpOptionsService} from '../utils/http-options.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  tokenValue: string = '';

  private httpOptions: {headers: HttpHeaders};
  baseUrl = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private defaultErrorService: DefaultErrorService,
    private httpOptionsService: HttpOptionsService
  ) { }

  public login(email: string, password: string): Observable<any> {
    this.httpOptionsService.generateHttpOptions();
    return this.http.post<SessionModel>(`${this.baseUrl}/login`, {email, password}, {headers: new HttpHeaders({ 'Content-Type': 'application/json'})})
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
    this.httpOptions = this.httpOptionsService.generateHttpOptions();
    return this.http.get(`${this.baseUrl}/token` , this.httpOptions)
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

  public verifyTokenAdmin(): Observable<any> {
    this.httpOptions = this.httpOptionsService.generateHttpOptions();

    return this.http.get(`${this.baseUrl}/token/role/admin` , this.httpOptions)
      .pipe(
        tap(data => data),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Incorrect token');
        })
      );
  }

  public subscribe(props: UserModel): Observable<string | UserModel> {
    this.httpOptionsService.generateHttpOptions();
    return this.http.post<UserModel>(`${this.baseUrl}/subscribe`, props, this.httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return this.defaultErrorService.handleError<string>(err, err.message);
        })
      );
  }

  public logout(): void {
    this.localStorageService.updateLocalStorageAttributes();
    this.setAuthorizationHeader(this.localStorageService.session.token);
    this.http.delete<UserModel>(`${this.baseUrl}/logout`, this.httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, err.message);
        })
      ).subscribe(
      err => console.log(err)
    );
    this.localStorageService.deleteSession();
  }

  private saveToken(data): void {
    if (data.token) {
      this.localStorageService.setSession({token: data.token});
    }
  }

  private setAuthorizationHeader(token: string): void {
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${token}`);
  }
}
