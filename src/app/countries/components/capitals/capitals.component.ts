import { Component, OnInit, OnDestroy } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable, Subscription } from 'rxjs'

import { CountriesService } from '../../services/countries.service'
import { FavoriteService } from 'src/app/auth/services/favorite.service'
import { LoaderService } from '../../services/loader.service'
import { HttpHeaders } from '@angular/common/http'
import { CountryCard } from 'src/app/interfaces/Country.interface'

@Component({
   selector: 'app-capitals',
   templateUrl: './capitals.component.html',
   styleUrls: ['./capitals.component.css']
})
export class CapitalsComponent implements OnInit, OnDestroy {
   private favoritesCountries: string[] = []
   private subscription = new Subscription()
   private headers = new HttpHeaders({ loader: 'on' })
   countriesList: CountryCard[] = []
   termSessionCapital: string = sessionStorage.getItem('capital') ?? ''
   isLoading$: Observable<boolean> = this.loaderSvc.isLoading$

   constructor (
      private countriesSvc: CountriesService,
      private favoriteSvc: FavoriteService,
      private loaderSvc: LoaderService,
      private matSnackBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      if (this.termSessionCapital !== '') this.searchCountries(this.termSessionCapital)

      this.subscription = this.favoriteSvc.favoritesList$.subscribe(
         (favList) => (this.favoritesCountries = favList)
      )
   }

   ngOnDestroy (): void {
      this.subscription.unsubscribe()
   }

   searchCountries (text: string): void {
      this.countriesSvc.getByCapital(text, this.headers).subscribe({
         next: (countries) => {
            this.countriesList = countries
            sessionStorage.setItem('capital', text)
         },
         error: (error) => {
            console.error(error)
            this.countriesList = []
            sessionStorage.removeItem('capital')
            this.matSnackBar.open(`Sin resultados para "${text}"`, 'X', { duration: 3000 })
         }
      })
   }

   checkIsFavorite (cca3: string): boolean {
      return this.favoritesCountries.includes(cca3)
   }
}
