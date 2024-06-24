import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { filter, switchMap, tap } from 'rxjs/operators'

import { CountriesService } from '../../services/countries.service'
import { FavoriteService } from 'src/app/auth/services/favorite.service'
import { Country } from 'src/app/interfaces/CountryRest.interface'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
   selector: 'app-favorites',
   templateUrl: './favorites.component.html',
   styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {
   private favoritesCountries: string[] = []
   private subscription = new Subscription()
   private searchTerm: string = ''
   private countriesList: Country[] = []
   filteredCountriesList: Country[] = []
   withoutFavorites: boolean = false

   constructor (
      private countriesSvc: CountriesService,
      private favoriteSvc: FavoriteService,
      private matSnackBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      this.subscription = this.favoriteSvc.favoritesList$
         .pipe(
            tap((favList) => (this.withoutFavorites = favList.length < 1)),
            filter((favList) => favList.length > 0),
            tap((favList) => (this.favoritesCountries = favList)),
            switchMap((favList) =>
               this.countriesSvc.getByCca3(favList, this.countriesSvc.cardParams)
            )
         )
         .subscribe({
            next: (countries) => {
               this.countriesList = countries
               this.filterCountries()
            },
            error: (err) => console.error(err)
         })
   }

   ngOnDestroy (): void {
      this.subscription.unsubscribe()
   }

   updateFavorites (cca3: string): void {
      this.countriesList = this.countriesList.filter((country) => country.cca3 !== cca3)
      this.filterCountries(this.searchTerm)
   }

   searchCountry (text: string): void {
      this.searchTerm = text
      this.filterCountries(text)
   }

   filterCountries (term: string = ''): void {
      this.filteredCountriesList = this.countriesList.filter((country) => {
         const countryName = country.translations['spa'].common.toLowerCase()
         return countryName.includes(term.toLowerCase())
      })

      term.trim() !== '' && this.filteredCountriesList.length < 1
         ? this.matSnackBar.open(`Sin resultados para "${term}"`, 'X', { duration: 3000 })
         : this.matSnackBar.dismiss()
   }

   checkIsFavorite (cca3: string): boolean {
      return this.favoritesCountries.includes(cca3)
   }
}
