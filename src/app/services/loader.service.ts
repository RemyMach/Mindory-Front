import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Loader} from '../models/loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<Loader>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }

  show(): void {
    this.loaderSubject.next({ show: true } as Loader);
  }
  hide(): void {
    this.loaderSubject.next({ show: false } as Loader);
  }
}
