import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../../models/User.model';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';
import {SessionModel} from '../../models/session.model';
import {DefaultErrorService} from './error/default-error.service';
import {environment} from '../../../environments/environment.dev';
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
    console.log(this.localStorageService.getSessionToken());
    console.log(this.httpOptions);
    return this.http.post(`${this.baseUrl}/token`, {} , this.httpOptions)
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
    this.httpOptionsService.generateHttpOptions();
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
