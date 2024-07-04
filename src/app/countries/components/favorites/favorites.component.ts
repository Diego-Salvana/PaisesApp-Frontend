import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'

import { CountriesService } from '../../services/countries.service'
import { FavoriteService } from 'src/app/auth/services/favorite.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CountryCard } from 'src/app/interfaces/Country.interface'

@Component({
   selector: 'app-favorites',
   templateUrl: './favorites.component.html',
   styleUrls: ['./favorites.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit, OnDestroy {
   private subscription = new Subscription()
   private searchTerm: string = ''
   private countriesList: CountryCard[] = []
   filteredCountriesList: CountryCard[] = []
   withoutFavorites: boolean = false
   loader?: boolean

   constructor (
      private countriesService: CountriesService,
      private favoriteService: FavoriteService,
      private matSnackBar: MatSnackBar,
      private changeDetectorRef: ChangeDetectorRef

   ) {}

   ngOnInit (): void {
      this.subscription = this.favoriteService.favoritesList$
         .pipe(
            tap(favList => {
               this.withoutFavorites = favList.length < 1
               
               if (favList.length < 1) throw new Error('Lista de favoritos vacía')

               if (this.loader === undefined) this.loader = true
            }),
            switchMap(favList => this.countriesService.getByCodeList(favList))
         )
         .subscribe({
            next: (countries) => {
               this.countriesList = countries
               this.filterCountries()
               this.loader = false
               this.changeDetectorRef.detectChanges()
            },
            error: (e) => {
               this.withoutFavorites = true
               this.loader = false
               this.matSnackBar.open(e.message, 'X', { duration: 3000 })
            }
         })
   }

   ngOnDestroy (): void {
      this.subscription.unsubscribe()
   }

   updateFavorites (cca3: string): void {
      this.countriesList = this.countriesList.filter(country => country.code3 !== cca3)
      this.filterCountries()
   }

   searchCountry (text: string): void {
      this.searchTerm = text.trim()
      this.filterCountries()
   }

   private filterCountries (): void {
      if (this.searchTerm.length < 1) {
         this.filteredCountriesList = this.countriesList
      } else {
         this.filteredCountriesList = this.countriesList.filter(country => {
            const countryName = country.nameSpa.toLowerCase()
   
            return countryName.includes(this.searchTerm.toLowerCase())
         })
      }
      
      this.searchTerm.length > 0 && this.filteredCountriesList.length < 1
         ? this.matSnackBar.open(`Sin resultados para "${this.searchTerm}"`, 'X', { duration: 3000 })
         : this.matSnackBar.dismiss()
   }
}
