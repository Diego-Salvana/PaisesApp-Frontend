import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { AuthService } from '../../auth/services/auth.service'

@Injectable({
   providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate, CanLoad {
   private user: string | null = null

   constructor (private authService: AuthService, private router: Router) {
      this.authService.currentUser$.subscribe(
         currentUser => (this.user = currentUser.username ?? null)
      )
   }

   canActivate (route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
      const path = route.routeConfig?.path
      
      if (path === 'favorites' || path === 'profile') return this.favoritesAndProfileActivate()
      if (path === 'auth') return this.authActivate()
      return false
   }

   canLoad (): Observable<boolean> | boolean {
      return this.authActivate()
   }

   private favoritesAndProfileActivate (): Observable<boolean> | boolean {
      if (this.user !== null) return true

      return this.authService.validateToken().pipe(
         map(() => {
            return true
         }),
         catchError(() => {
            void this.router.navigate(['/search/by-country'])
            return of(false)
         })
      )
   }

   private authActivate (): Observable<boolean> | boolean {
      if (this.user !== null) return false

      return this.authService.validateToken().pipe(
         map(() => {
            void this.router.navigate(['/search/by-country'])
            return false
         }),
         catchError(() => {
            return of(true)
         })
      )
   }
}
