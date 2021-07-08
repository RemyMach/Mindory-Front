import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {RoleService} from './mindory-api/role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private localStorageService: LocalStorageService,
    private roleService: RoleService
  ) { }
  public isConnect(): boolean {
    this.localStorageService.updateLocalStorageAttributes();
    return this.localStorageService.user !== null && this.localStorageService.session !== null;
  }
  public isAdmin(): boolean {
    this.localStorageService.updateLocalStorageAttributes();
    const token = this.localStorageService.session.token;
    if (token === null){
      return false;
    }
    return true;
    // TODO: Make getRole not create a infinite loop of the dead
    // this.roleService.getRole(token);
    // return this.roleService.userRole === 'admin';
  }
}
