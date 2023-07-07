import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
   intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const JWToken = localStorage.getItem('JWToken');
      const headers = req.headers.set('authorization', `Bearer ${JWToken}`);

      const reqClone = req.clone({ headers });

      return next.handle(reqClone);
   }
}
