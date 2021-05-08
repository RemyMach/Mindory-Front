import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
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
    if (!this.localStorageService.session && this.validateSession(this.localStorageService.session.token)) {
      this.localStorageService.updateLocalStorageAttributes();
      return true;
    }
    this.router.navigate(['login']);
  }

  validateSession(token: string): Subscription {
    return this.userMindoryService.getUserByToken(token)
      .subscribe(
        data => true,
        error => false
      );
  }

}
