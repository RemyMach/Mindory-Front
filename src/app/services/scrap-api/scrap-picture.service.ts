import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Card} from '../../models/card.model';
import {Observable} from 'rxjs';
import {Part} from '../../models/part.model';
import {catchError, tap} from 'rxjs/operators';
import {DefaultErrorService} from '../mindory-api/error/default-error.service';
import {LocalStorageService} from '../local-storage.service';
import {Picture} from '../../models/picture.model';
import {SnackbarService} from '../snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ScrapPictureService {

  pictures: Picture[] = [];

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  baseUrl = 'http://localhost:5000/pictures';

  constructor(
    private http: HttpClient,
    private defaultErrorService: DefaultErrorService,
    private snackBarService: SnackbarService
  ) { }

  private scrapPictures(name: string): Observable<any> {
    return this.http.post<Picture>(`${this.baseUrl}`,  {name}, this.httpOptions)
      .pipe(
        tap(data => console.log(data)
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }

  private listScrapPictures(name: string): Observable<any> {
    return this.http.get<Picture[]>(`${this.baseUrl}/${name}`,  this.httpOptions)
      .pipe(
        tap(data => data
        ),
        catchError((err: HttpErrorResponse) => {
          return this.defaultErrorService.handleError<string>(err, 'Please retry later');
        })
      );
  }

  public scrapPicturesWithApi(name: string): void {
    this.scrapPictures(name).subscribe(
      data => {
        this.snackBarService.openSnackBar(`${name} a été scrap`, 'OK', 'Success');
      },
      error => this.snackBarService.openSnackBar('Veuillez réessayez plus tard', 'OK', 'Error')
    );
  }

  public getAllPictureFromAName(name: string): void {
    this.listScrapPictures(name).subscribe(
      data => this.pictures = data,
      error => this.snackBarService.openSnackBar('Veuillez réessayez plus tard', 'OK', 'Error')
    );
  }
}
