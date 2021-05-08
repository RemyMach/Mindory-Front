import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultErrorService {
  MINDORY_NO_RESPONSE_MESSAGE = 'Mindory have a problem please retry later';

  constructor() { }

  public handleError<T>(error: HttpErrorResponse, operation = 'operation', result?: T): Observable<T> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError(this.MINDORY_NO_RESPONSE_MESSAGE);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(operation);
  }
}