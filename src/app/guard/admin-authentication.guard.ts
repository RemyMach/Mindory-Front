import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, Subscriber} from 'rxjs';
import {RoomValidService} from '../services/mindory-api/room/room-valid.service';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationGuard implements CanActivate {
  constructor(private autService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>((observable: Subscriber<boolean>) => {
      return this.autService.tryConnectAnAdmin().subscribe(
        data => {
          if (!data) {
            this.router.navigate(['']);
            return observable.next(false);
          }
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
