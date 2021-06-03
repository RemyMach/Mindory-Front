import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }
  public isConnect(): boolean {
    this.localStorageService.updateLocalStorageAttributes();
    return this.localStorageService.user !== null && this.localStorageService.session !== null;
  }
}
