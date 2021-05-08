import { Injectable } from '@angular/core';
import {UserModel} from '../models/User.model';
import {SessionModel} from '../models/session.model';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  user: UserModel | null;
  session: SessionModel | null;

  constructor() { }

  updateLocalStorageAttributes(): void {
    this.user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null;
    this.session = localStorage.getItem('session') !== null ? JSON.parse(localStorage.getItem('session')) : null;
  }

  setUser(userSession: UserModel): void {
    localStorage.setItem('user', JSON.stringify(userSession));
  }

  setSession(session: SessionModel): void {
    localStorage.setItem('session', JSON.stringify(session));
  }
}
