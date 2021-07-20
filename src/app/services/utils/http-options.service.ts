import { Injectable } from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionsService {

  constructor(
    public localStorageService: LocalStorageService
  ) { }

  public generateHttpOptions(): {headers: HttpHeaders} {
    if (!this.localStorageService.getSessionToken()) {
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    }else {
      console.log('on passe dans le bon endroit');
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.localStorageService.getSessionToken() })
      };
    }
  }
}
