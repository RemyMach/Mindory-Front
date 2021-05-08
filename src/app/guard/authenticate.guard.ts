import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';
import {UserService} from '../services/mindory-api/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private userMindoryService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.localStorageService.updateLocalStorageAttributes();
    console.log('je passe dans le guard start');
    if (this.localStorageService.session) {
      return this.validateSession(this.localStorageService.session.token);
    }
    this.router.navigate(['login']);

  }

  validateSession(token: string): Subscription{
    return this.userMindoryService.getUserByToken(token)
      .subscribe(
        data => true,
        error => false
      );
  }
  redirectIfInvalid(): Observable<boolean> {
    this.router.navigate(['login']);
    return new Observable<boolean>((observable) => {
      observable.next(false);
    });
  }
  validReturn(): Observable<boolean> {
    return new Observable<boolean>((observable) => {
      observable.next(true);
    });
  }

}
