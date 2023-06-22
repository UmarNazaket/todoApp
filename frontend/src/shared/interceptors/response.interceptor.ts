import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AutoLogout } from '../global';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 200) {
            console.log("REQUEST COMPLETED ");
          } else if (event.status === 401) {
            AutoLogout()
          } else if (event.status === 500) {
            this.displaySystemError()
          } else {
            // Handle other status codes
          }
        }
      })
    );
  }

  displaySystemError() {
    window.alert('System error');
  }
}
