import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ResponseFavorites } from 'src/app/interfaces/AuthUser.interface'
import { environment } from 'src/environments/environment'

@Injectable({
   providedIn: 'root'
})
export class FavoriteService {
   private favoritesList = new BehaviorSubject<string[]>([])
   favoritesList$ = this.favoritesList.asObservable()
   private baseUrl: string = `${environment.baseUsersUrl}/favorites`

   constructor (private http: HttpClient) {}

   updateFavoritesList (favList: string[] = []): void {
      this.favoritesList.next(favList)
   }

   addFavorite (cca3Code: string): void {
      const currentfavorites = this.favoritesList.getValue()
      const updatedFavs = [...currentfavorites, cca3Code]
      this.favoritesList.next(updatedFavs)

      this.http.patch<ResponseFavorites>(`${this.baseUrl}/add`, { cca3Code }).subscribe({
         error: () => this.favoritesList.next(currentfavorites)
      })
   }

   removeFavorite (cca3Code: string): void {
      const currentfavorites = this.favoritesList.getValue()
      const updatedFavs = currentfavorites.filter((cca3) => cca3 !== cca3Code)
      this.favoritesList.next(updatedFavs)

      this.http.patch<ResponseFavorites>(`${this.baseUrl}/remove`, { cca3Code }).subscribe({
         error: () => this.favoritesList.next(currentfavorites)
      })
   }
}
