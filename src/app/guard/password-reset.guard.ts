import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, Subscriber} from 'rxjs';
import {PasswordResetService} from '../services/mindory-api/password-reset.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetGuard implements CanActivate {
  constructor(
    private router: Router,
    private passwordResetService: PasswordResetService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>((observable: Subscriber<boolean>) => {
      return this.passwordResetService.verifyPasswordResetToken(route.params.token).subscribe(
        data => {
          return observable.next(true);
        },
        error => {
          this.router.navigate(['']);
          return observable.next(false);
        }
      );
    });
  }

}
