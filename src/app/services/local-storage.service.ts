import { Injectable } from '@angular/core';
import {User} from '../models/User.model';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  user: User | null;

  constructor() { }

  updateLocalStorageAttributes(): void {
    this.user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null;
  }

  setUser(userSession: User): void {
    localStorage.setItem('user', JSON.stringify(userSession));
  }
}
