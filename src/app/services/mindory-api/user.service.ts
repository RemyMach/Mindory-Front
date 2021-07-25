import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from '../local-storage.service';
import {Observable} from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';
import {UserModel} from '../../models/User.model';
import {DefaultErrorService} from './error/default-error.service';
import {HttpOptionsService} from '../utils/http-options.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserModel | null;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  baseUrl = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private defaultErrorService: DefaultErrorService,
    private httpOptionsService: HttpOptionsService
  ) { }

  public getUserByToken(): Observable<any> {
    this.httpOptions = this.httpOptionsService.generateHttpOptions();
    return this.http.get<UserModel>(`${this.baseUrl}/`, this.httpOptions)
      .pipe(
        take(1),
        map(data => {
          if (data) {
            this.user = data;
            return;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Incorrect email ou/et mot de passe');
        })
      );
  }
}
