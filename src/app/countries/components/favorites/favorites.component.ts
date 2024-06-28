import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { filter, switchMap, tap } from 'rxjs/operators'

import { CountriesService } from '../../services/countries.service'
import { FavoriteService } from 'src/app/auth/services/favorite.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CountryCard } from 'src/app/interfaces/Country.interface'

@Component({
   selector: 'app-favorites',
   templateUrl: './favorites.component.html',
   styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {
   private favoritesCountries: string[] = []
   private subscription = new Subscription()
   private searchTerm: string = ''
   private countriesList: CountryCard[] = []
   filteredCountriesList: CountryCard[] = []
   withoutFavorites: boolean = false

   constructor (
      private countriesService: CountriesService,
      private favoriteService: FavoriteService,
      private matSnackBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      this.subscription = this.favoriteService.favoritesList$
         .pipe(
            tap((favList) => (this.withoutFavorites = favList.length < 1)),
            filter((favList) => favList.length > 0),
            tap((favList) => (this.favoritesCountries = favList)),
            switchMap((favList) => this.countriesService.getByCodeList(favList))
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
      this.countriesList = this.countriesList.filter((country) => country.code3 !== cca3)
      this.filterCountries(this.searchTerm)
   }

   searchCountry (text: string): void {
      this.searchTerm = text
      this.filterCountries(text)
   }

   filterCountries (term: string = ''): void {
      this.filteredCountriesList = this.countriesList.filter((country) => {
         const countryName = country.nameSpa.toLowerCase()
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
