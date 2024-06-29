import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs'

import { FavoriteService } from './favorite.service'
import { Auth, CurrentUser, ResponseUser, User } from 'src/app/interfaces/AuthUser.interface'

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private baseUsersUrl: string = environment.baseUsersUrl
   private currentUser = new BehaviorSubject<CurrentUser>({})
   currentUser$ = this.currentUser.asObservable()

   constructor (
      private http: HttpClient,
      private favoriteService: FavoriteService,
      private router: Router
   ) {}

   registerUser ({ username, email, password }: User): Observable<ResponseUser> {
      const registerBody = { username, email, password }
      return this.http.post<ResponseUser>(`${this.baseUsersUrl}/auth/register`, registerBody).pipe(
         tap(({ username, JWToken }) => {
            localStorage.setItem('JWToken', JWToken)
            this.currentUser.next({ username })
         }),
         catchError((e: HttpErrorResponse) => {
            let message
            
            if (e.status === 409) message = 'El email ya está registrado'
            else if (e.status === 400) message = 'Error de formato de datos'
            else message = 'Error de servidor al registrar usuario'

            throw new Error(message)
         })
      )
   }

   loginUser ({ email, password }: Auth): Observable<ResponseUser> {
      return this.http
         .post<ResponseUser>(`${this.baseUsersUrl}/auth/login`, { email, password })
         .pipe(
            tap(({ username, JWToken, favorites }) => {
               localStorage.setItem('JWToken', JWToken)
               this.currentUser.next({ username })
               this.favoriteService.updateFavoritesList(favorites)
            }),
            catchError((e: HttpErrorResponse) => {
               const message = e.status === 404 || e.status === 401
                  ? 'Usuario o contraseña inválidos'
                  : 'Error de servidor al iniciar sesión'

               throw new Error(message)
            })
         )
   }

   validateToken (): Observable<ResponseUser> {
      return this.http.get<ResponseUser>(`${this.baseUsersUrl}/auth/refresh`).pipe(
         tap(({ username, favorites, JWToken }) => {
            localStorage.setItem('JWToken', JWToken)
            this.currentUser.next({ username })
            this.favoriteService.updateFavoritesList(favorites)
         }),
         catchError((e: HttpErrorResponse) => {
            const message = e.error.message ?? 'Invalid token'

            throw new Error(message)
         })
      )
   }

   logOut (): void {
      this.currentUser.next({})
      localStorage.removeItem('JWToken')
      this.favoriteService.updateFavoritesList([])

      const path = this.router.url.split('/').pop()
      if (path === 'favorites') void this.router.navigate(['/search'])
   }
}
