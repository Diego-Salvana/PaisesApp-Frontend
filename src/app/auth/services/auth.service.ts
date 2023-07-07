import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';

import { FavoriteService } from './favorite.service';
import { Auth, CurrentUser, ResponseUser, User } from 'src/app/interfaces/AuthUser.interface';

type isLoader = 'On' | 'Off';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   private baseUsersUrl: string = environment.baseUsersUrl;
   private currentUser = new BehaviorSubject<CurrentUser>({});
   currentUser$ = this.currentUser.asObservable();

   constructor(
      private http: HttpClient,
      private favoriteSvc: FavoriteService,
      private router: Router
   ) {}

   registerUser({ username, email, password }: User): Observable<ResponseUser> {
      const registerBody = { username, email, password };
      return this.http.post<ResponseUser>(`${this.baseUsersUrl}/auth/register`, registerBody).pipe(
         tap(({ username, JWToken }) => {
            localStorage.setItem('JWToken', JWToken);
            this.currentUser.next({ username });
         }),
         catchError((err) => {
            console.error(err);
            if (err.error === 'USER_EMAIL_ALREADY_EXISTS') throw 'Ya existe usuario con ese email.';
            else throw 'Error al crear usuario.';
         })
      );
   }

   loginUser({ email, password }: Auth): Observable<ResponseUser> {
      return this.http
         .post<ResponseUser>(`${this.baseUsersUrl}/auth/login`, { email, password })
         .pipe(
            tap(({ username, JWToken }) => {
               localStorage.setItem('JWToken', JWToken);
               this.currentUser.next({ username });
            }),
            tap(({ favorites }) => this.favoriteSvc.updateFavoritesList(favorites)),
            catchError((err) => {
               console.error(err);
               if (err.error === 'USER_NOT_FOUND') throw 'No se encontró el usuario.';
               else if (err.error === 'INCORRECT_PASSWORD') throw 'Usuario o contraseña inválidos.';
               else throw 'No se pudo iniciar sesión.';
            })
         );
   }

   validateToken(): Observable<ResponseUser> {
      const headers = new HttpHeaders({ loader: 'Off' });

      return this.http.get<ResponseUser>(`${this.baseUsersUrl}/auth/refresh`, { headers }).pipe(
         tap(({ username, favorites, JWToken }) => {
            localStorage.setItem('JWToken', JWToken);
            this.currentUser.next({ username });
            this.favoriteSvc.updateFavoritesList(favorites);
         })
      );
   }

   logOut(): void {
      this.currentUser.next({});
      localStorage.removeItem('JWToken');
      this.favoriteSvc.updateFavoritesList([]);

      const path = this.router.url.split('/').pop();
      if (path === 'favorites') this.router.navigate(['/search']);
   }
}
