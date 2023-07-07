import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseFavorites } from 'src/app/interfaces/AuthUser.interface';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class FavoriteService {
   private favoritesList = new BehaviorSubject<string[]>([]);
   favoritesList$ = this.favoritesList.asObservable();
   private baseUrl: string = `${environment.baseUsersUrl}/favorites`;
   loaderHeaders = new HttpHeaders({ loader: 'off' });

   constructor(private http: HttpClient) {}

   updateFavoritesList(favList: string[] = []) {
      this.favoritesList.next(favList);
   }

   addFavorite(cca3Code: string) {
      const currentfavorites = this.favoritesList.getValue();
      const updatedFavs = [...currentfavorites, cca3Code];
      this.favoritesList.next(updatedFavs);

      this.http
         .patch<ResponseFavorites>(
            `${this.baseUrl}/add`,
            { cca3Code },
            { headers: this.loaderHeaders }
         )
         .subscribe({
            error: () => this.favoritesList.next(currentfavorites),
         });
   }

   removeFavorite(cca3Code: string) {
      const currentfavorites = this.favoritesList.getValue();
      const updatedFavs = currentfavorites.filter((cca3) => cca3 !== cca3Code);
      this.favoritesList.next(updatedFavs);

      this.http
         .patch<ResponseFavorites>(
            `${this.baseUrl}/remove`,
            { cca3Code },
            { headers: this.loaderHeaders }
         )
         .subscribe({
            error: () => this.favoritesList.next(currentfavorites),
         });
   }
}
