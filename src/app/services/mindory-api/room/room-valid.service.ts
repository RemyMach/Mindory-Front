import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Part} from '../../../models/part.model';
import {catchError, map, take, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.dev';
import {DefaultErrorService} from '../error/default-error.service';
import { Router} from '@angular/router';
import {LocalStorageService} from '../../local-storage.service';
import {HttpOptionsService} from '../../utils/http-options.service';

@Injectable({
  providedIn: 'root'
})
export class RoomValidService {

  private httpOptions: {headers: HttpHeaders};
  private baseUrl = 'http://localhost:3000/rooms/token';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
    private route: Router,
    private localStorageService: LocalStorageService,
    private httpOptionsService: HttpOptionsService
  ) { }

  public isValidToken(token: string): Observable<any> {
    this.httpOptions = this.httpOptionsService.generateHttpOptions();
    return this.http.get<boolean>(`${this.baseUrl}/${token}`,  this.httpOptions)
      .pipe(
        tap(data => data
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }

  public validateToken(token: string): Observable<boolean> {
    return this.isValidToken(token).pipe(
        take(1),
        map(result => {
          console.log(result);
          if (result) {
            return true;
          }
          else {
            this.route.navigate(['/']);
            return false;
          }
        }),
      catchError(async () => {
        this.route.navigate(['/']);
        return false;
      })
    );
  }
}
