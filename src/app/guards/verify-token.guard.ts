import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
   providedIn: 'root',
})
export class VerifyTokenGuard implements CanActivate, CanLoad {
   private loggedUser: string = '';

   constructor(private authService: AuthService, private router: Router) {
      this.authService.currentUser$.subscribe(
         (currentUser) => (this.loggedUser = currentUser.username || '')
      );
   }

   canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
      const path = route.routeConfig?.path;

      if (this.loggedUser) return path === 'favorites';
      else if (path === 'favorites') return this.favoritesActivate();
      else if (path === 'auth') return this.authActivate();
      else return false;
   }

   canLoad(): Observable<boolean> | boolean {
      if (this.loggedUser) return false;
      else return this.authActivate();
   }

   favoritesActivate(): Observable<boolean> {
      return this.authService.validateToken().pipe(
         map(() => true),
         catchError(() => {
            this.router.navigate(['/search/by-country']);
            return of(false);
         })
      );
   }

   authActivate(): Observable<boolean> {
      return this.authService.validateToken().pipe(
         map(() => {
            this.router.navigate(['/search/by-country']);
            return false;
         }),
         catchError(() => of(true))
      );
   }
}
