import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ResponseFavorites } from 'src/app/interfaces/AuthUser.interface'
import { environment } from 'src/environments/environment'

@Injectable({
   providedIn: 'root'
})
export class FavoriteService {
   private baseUrl: string = `${environment.baseUsersUrl}/favorites`
   private favoritesList = new BehaviorSubject<string[]>([])
   favoritesList$ = this.favoritesList.asObservable()

   constructor (private http: HttpClient) {}

   updateFavoritesList (favList: string[] = []): void {
      this.favoritesList.next(favList)
   }

   addFavorite (code3: string): void {
      const currentfavorites = this.favoritesList.getValue()
      this.favoritesList.next([...currentfavorites, code3])

      this.http.patch<ResponseFavorites>(`${this.baseUrl}/add/${code3}`, {}).subscribe({
         error: () => this.favoritesList.next(currentfavorites)
      })
   }

   removeFavorite (code3: string): void {
      const currentfavorites = this.favoritesList.getValue()
      const updatedFavs = currentfavorites.filter(cca3 => cca3 !== code3)
      this.favoritesList.next(updatedFavs)

      this.http.patch<ResponseFavorites>(`${this.baseUrl}/remove/${code3}`, {}).subscribe({
         error: () => this.favoritesList.next(currentfavorites)
      })
   }
}
