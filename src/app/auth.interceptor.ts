import { UserInteractionsService } from './user-interactions.service';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    public interaction: UserInteractionsService
  ) {}
  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('jwt_token');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    return next.handle(request).pipe(
      catchError(evt => {
        if(evt instanceof HttpErrorResponse && evt.status === 401 && !evt.url.includes('login')) {
          this.router.navigate(['login']).finally(() => {
            this.interaction.presentToast('Sua seção expirou!', 'danger');
          });
        }
        return throwError(evt);
      })
    );
  }
}
