import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../../models/User.model';
import {catchError, map, retry, tap} from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';
import {SessionModel} from '../../models/session.model';
import {DefaultErrorService} from './error/default-error.service';


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
    private localStorageService: LocalStorageService,
    private defaultErrorService: DefaultErrorService
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

  /*private subscribe(props: UserModel): Observable<User> {

  }*/

  private saveToken(data): void {
    if (data.token) {
      this.localStorageService.setSession({token: data.token});
      return;
    }
  }
}
