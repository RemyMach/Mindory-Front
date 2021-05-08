import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from '../local-storage.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {UserModel} from '../../models/User.model';
import {DefaultErrorService} from './error/default-error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  baseUrl = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private defaultErrorService: DefaultErrorService
  ) { }

  public getUserByToken(token: string): Observable<any> {
    this.setAuthorizationHeader(token);

    return this.http.get<UserModel>(`${this.baseUrl}/`, this.httpOptions)
      .pipe(
        tap(data => {
          if (data) {
            this.saveUser(data);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Incorrect email ou/et mot de passe');
        })
      );
  }
  private saveUser(data): void {
    if (data.username) {
      this.localStorageService.setUser(data);
      return;
    }
  }
  private setAuthorizationHeader(token: string): void {
    this.httpOptions.headers.append('Authorization', token);
  }
}
