import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../countries/services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
   constructor(private loaderSvc: LoaderService) {}

   intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const loader = req.headers.get('loader');

      if (!loader) return next.handle(req);

      this.loaderSvc.show();

      return next.handle(req).pipe(finalize(() => this.loaderSvc.hide()));
   }
}
