import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Part} from '../../../models/part.model';
import {catchError, tap} from 'rxjs/operators';
import {DefaultErrorService} from '../error/default-error.service';
import {LocalStorageService} from '../../local-storage.service';
import {HttpOptionsService} from '../../utils/http-options.service';
import {Router} from '@angular/router';
import {errorObject} from 'rxjs/internal-compatibility';
import {SnackbarService} from '../../snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RoomJoinService {

  private httpOptions: {headers: HttpHeaders};
  private baseUrl = 'http://localhost:3000/rooms';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
    private localStorageService: LocalStorageService,
    private httpOptionsService: HttpOptionsService,
    private router: Router,
    public snackbarService: SnackbarService
  ) { }

  private getRoomFromKeyWord(keyWord: string): Observable<any> {
    this.httpOptions = this.httpOptionsService.generateHttpOptions();
    return this.http.get<Part>(`${this.baseUrl}/keyWord/${keyWord}`, this.httpOptions)
      .pipe(
        tap(data => {
            return data;
          }
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }
  public validateRoomWithKeyWord(keyWord: string): void {
    this.getRoomFromKeyWord(keyWord).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['play/duo/' + data.token]);
      },
      error => {
        this.snackbarService.openSnackBar('mot de passe custom non valid', 'OK', 'Error');
      }
    );
  }

}
