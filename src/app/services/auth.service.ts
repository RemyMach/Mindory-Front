import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {RoleService} from './mindory-api/role.service';
import {AuthenticationService} from './mindory-api/authentication.service';
import {Observable} from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectionValidate: boolean;
  constructor(
    private localStorageService: LocalStorageService,
    private roleService: RoleService,
    private authenticationService: AuthenticationService
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
  public isConnect(): boolean {
    this.localStorageService.updateLocalStorageAttributes();
    return this.localStorageService.user !== null && this.localStorageService.session !== null;
  }
  public isAdmin(): boolean {
    if (this.isConnect() === false){
      return false;
    }
    // TODO: Make getRole not create a infinite loop of the dead
    // this.roleService.getRole(token);
    // return this.roleService.userRole === 'admin';
    return true;
  }
}
