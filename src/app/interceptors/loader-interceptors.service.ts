import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor{

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.onEnd();
        }
      },
      (err: any) => {
        this.onEnd();
      }));
  }

  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {

    this.loaderService.show();
  }
  private hideLoader(): void {

    this.loaderService.hide();
  }
}
