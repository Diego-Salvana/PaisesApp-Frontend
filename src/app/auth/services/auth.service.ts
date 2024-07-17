import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs'

import { FavoriteService } from './favorite.service'
import { Auth, CurrentUser, ResponseUser, UpdateUser, User } from 'src/app/interfaces/AuthUser.interface'

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
      return this.http.post<ResponseUser>(`${this.baseUsersUrl}/auth/register`, registerBody)
         .pipe(
            tap(({ username, JWToken }) => {
               this.currentUser.next({ username })
               localStorage.setItem('JWToken', JWToken)
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
      return this.http.post<ResponseUser>(`${this.baseUsersUrl}/auth/login`, { email, password })
         .pipe(
            tap(({ username, JWToken, favorites }) => {
               this.currentUser.next({ username })
               this.favoriteService.updateFavoritesList(favorites)
               localStorage.setItem('JWToken', JWToken)
            }),
            catchError((e: HttpErrorResponse) => {
               const message = e.status === 404 || e.status === 401
                  ? 'Usuario o contraseña inválidos'
                  : 'Error de servidor al iniciar sesión'

               throw new Error(message)
            })
         )
   }

   updateUser ({ newUsername, password, newPassword }: UpdateUser): Observable<ResponseUser> {
      return this.http
         .patch<ResponseUser>(`${this.baseUsersUrl}/auth/update`, { newUsername, password, newPassword })
         .pipe(
            tap(({ username, JWToken }) => {
               this.currentUser.next({ username })
               localStorage.setItem('JWToken', JWToken)
            }),
            catchError((e: HttpErrorResponse) => {
               let message

               switch (e.status) {
                  case 400:
                     message = 'Datos de formulario inválidos'
                     break
                  case 401:
                     message = 'Contraseña inválida'
                     break
                  case 404:
                     message = 'Usuario no encontrado'
                     break
                  default:
                     message = 'Error al actualizar usuario'
                     break
               }
            
               throw new Error(message)
            })
         )
   }

   validateToken (): Observable<ResponseUser> {
      return this.http.get<ResponseUser>(`${this.baseUsersUrl}/auth/refresh`)
         .pipe(
            tap(({ username, favorites, JWToken }) => {
               this.currentUser.next({ username })
               this.favoriteService.updateFavoritesList(favorites)
               localStorage.setItem('JWToken', JWToken)
            }),
            catchError((e: HttpErrorResponse) => {
               const message = e.error.message ?? 'Token inválido'

               throw new Error(message)
            })
         )
   }

   logOut (): void {
      this.currentUser.next({})
      this.favoriteService.updateFavoritesList(null)
      localStorage.removeItem('JWToken')

      const path = this.router.url.split('/').pop()
      if (path === 'favorites') void this.router.navigate(['/search'])
   }
}
