import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PlayDuoService} from '../services/play/play-duo.service';

@Injectable({
  providedIn: 'root'
})
export class TokenValidGuard implements CanActivate {

  constructor(private roomValidService: RoomValidService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.roomValidService.validateToken(route.params.token);
  }

}
