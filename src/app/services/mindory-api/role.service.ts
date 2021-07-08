import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from '../local-storage.service';
import {DefaultErrorService} from './error/default-error.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public userRole: string;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private baseUrl = 'http://localhost:3000/role';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private defaultErrorService: DefaultErrorService,
  ) {
  }

  getRole(token: string): void {
    this.getUserRole(token).subscribe(
      value => this.userRole = value,
      err => console.log(err)
    );
  }

  private getUserRole(token: string): Observable<string> {
    this.setAuthorizationHeader(token);
    return this.http.get<string>(`${this.baseUrl}/`, this.httpOptions).pipe(
      tap(data => data),
      catchError((err: HttpErrorResponse) => {
        return this.defaultErrorService.handleError<string>(err, 'Incorrect token');
      })
    );
  }

  private setAuthorizationHeader(token: string): void {
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${token}`);
  }
}
