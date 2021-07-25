import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {RoleService} from './mindory-api/role.service';
import {AuthenticationService} from './mindory-api/authentication.service';
import {Observable} from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectionValidate: boolean;
  adminRole: boolean;
  constructor(
    private localStorageService: LocalStorageService,
    private roleService: RoleService,
    private authenticationService: AuthenticationService,
  ) { }
  public tryConnect(): Observable<boolean> {
    return this.authenticationService.verifyToken().pipe(
      take(1),
      map(
        result => {
          this.connectionValidate = true;
          return true;
        }
    ),
      catchError(async () => {
        this.connectionValidate = false;
        return false;
      }));
  }

  public tryConnectAnAdmin(): Observable<boolean> {
    return this.authenticationService.verifyTokenAdmin().pipe(
      take(1),
      map(
        () => {
          this.adminRole = true;
          return true;
        }
      ),
      catchError(async () => {
        this.adminRole = false;
        return false;
      }));
  }
}
