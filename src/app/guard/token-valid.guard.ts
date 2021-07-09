import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';
import {RoomValidService} from '../services/mindory-api/room/room-valid.service';
import {error} from '@angular/compiler/src/util';
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
