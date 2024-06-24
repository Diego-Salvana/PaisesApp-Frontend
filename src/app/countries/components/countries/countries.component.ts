import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { HttpHeaders } from '@angular/common/http'
import { Observable, Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'

import { CountriesService } from '../../services/countries.service'
import { FavoriteService } from 'src/app/auth/services/favorite.service'
import { LoaderService } from '../../services/loader.service'
import { Country } from 'src/app/interfaces/CountryRest.interface'

@Component({
   selector: 'app-countries',
   templateUrl: './countries.component.html',
   styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit, OnDestroy {
   private favoritesCountries: string[] = []
   private countriesList: Country[] = []
   private subscription = new Subscription()
   private headers = new HttpHeaders({ loader: 'on' })
   filteredCountries: Country[] = []
   selectedRegion = sessionStorage.getItem('region')
   termSessionCountry: string = sessionStorage.getItem('country') ?? ''
   countriesForm = this.fb.group({
      region: [this.selectedRegion]
   })

   isLoading$: Observable<boolean> = this.loaderSvc.isLoading$

   constructor (
      private fb: FormBuilder,
      private countriesSvc: CountriesService,
      private favoriteSvc: FavoriteService,
      private loaderSvc: LoaderService,
      private matSnackBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      if (this.termSessionCountry !== '') this.searchCountries(this.termSessionCountry)

      this.subscription = this.favoriteSvc.favoritesList$.subscribe(
         favList => (this.favoritesCountries = favList)
      )

      this.countriesForm.valueChanges.subscribe(({ region }) => {
         this.selectedRegion = region !== undefined ? region : null

         if (this.selectedRegion !== null) {
            sessionStorage.setItem('region', this.selectedRegion)
            this.filteredCountries = this.filterByRegion(this.countriesList)
         } else {
            sessionStorage.removeItem('region')
            this.filteredCountries = this.countriesList
         }
      })
   }

   ngOnDestroy (): void {
      this.subscription.unsubscribe()
   }

   searchCountries (text: string): void {
      this.countriesSvc
         .getByName(text, this.headers)
         .pipe(
            map((countries) => {
               this.countriesList = countries
               return this.filterByRegion(countries)
            }),
            tap((filteredCountries) => {
               if (filteredCountries.length < 1) throw new Error(`No results for "${text}"`)
            })
         )
         .subscribe({
            next: (filteredCountries) => {
               this.filteredCountries = filteredCountries
               sessionStorage.setItem('country', text)
            },
            error: (error) => {
               console.error(error)
               this.filteredCountries = []
               sessionStorage.removeItem('country')
               this.matSnackBar.open(`Sin resultados para "${text}"`, 'X', { duration: 3000 })
            }
         })
   }

   filterByRegion (countries: Country[]): Country[] {
      return countries.filter(country => {
         const countryRegion = country.region.toLowerCase()

         return this.selectedRegion !== null
            ? this.selectedRegion === countryRegion
            : true
      })
   }

   checkIsFavorite (cca3: string): boolean {
      return this.favoritesCountries.includes(cca3)
   }
}
