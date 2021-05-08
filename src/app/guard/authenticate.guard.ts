import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of, Subscriber, Subscription} from 'rxjs';
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
    return new Observable<boolean>((observable: Subscriber<boolean>) => {
      this.localStorageService.updateLocalStorageAttributes();
      if (this.localStorageService.session) {
        return this.userMindoryService.getUserByToken(this.localStorageService.session.token)
          .subscribe(
            data => {
              return observable.next(true);
            },
            error => {
              this.router.navigate(['login']);
              return observable.next(false);
            },
          );
      }
      this.router.navigate(['login']);
      observable.next(false);
    });
  }
}
