import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'

import { CountriesService } from '../../services/countries.service'
import { LoaderService } from '../../services/loader.service'
import { translateContinent } from 'src/app/shared/utils'
import { addCards, showCountries } from '../../utils/infinity-scroll'
import { CountryCard } from 'src/app/interfaces/Country.interface'

@Component({
   selector: 'app-countries',
   templateUrl: './countries.component.html',
   styleUrls: ['./countries.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountriesComponent implements OnInit {
   private headers = new HttpHeaders({ loader: 'on' })
   private countriesList: CountryCard[] = []
   private filteredCountries: CountryCard[] = []
   countriesShown: CountryCard[] = []
   selectedRegion: string | null = sessionStorage.getItem('region')
   sessionCountryTerm: string | null = sessionStorage.getItem('country')
   countriesForm = this.fb.group({
      region: [this.selectedRegion]
   })

   isLoading$: Observable<boolean> = this.loaderService.isLoading$

   constructor (
      private fb: FormBuilder,
      private countriesService: CountriesService,
      private loaderService: LoaderService,
      private matSnackBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      if (this.sessionCountryTerm !== null) this.searchCountries(this.sessionCountryTerm)
      else if (this.selectedRegion !== null) this.searchByRegion()

      this.countriesForm.valueChanges.subscribe(({ region }) => {
         this.selectedRegion = region !== undefined ? region : null
         
         if (this.selectedRegion !== null) {
            sessionStorage.setItem('region', this.selectedRegion)

            if (this.countriesList.length < 1) this.searchByRegion()
            else this.filterByRegion(); this.countriesShown = showCountries(this.filteredCountries)
         } else {
            this.cleanStorage('region')
            this.filteredCountries = [...this.countriesList]
            this.countriesShown = showCountries(this.filteredCountries)
         }
      })
   }

   searchCountries (text?: string): void {
      if (text === undefined || text.trim().length < 1) {
         this.resetLists()
         this.cleanStorage('country')

         if (this.selectedRegion !== null) this.searchByRegion()
         else this.filteredCountries = [...this.countriesList]
         return
      }

      this.countriesService.getByName(text, this.headers)
         .pipe(
            tap(countries => {
               this.countriesList = countries
               this.filterByRegion()

               if (this.filteredCountries.length < 1 && this.selectedRegion !== null) {
                  const message = `Sin resultados para "${text}" en ${translateContinent(this.selectedRegion)}`
                  this.matSnackBar.open(message, 'X', { duration: 3000 })
               }
            })
         )
         .subscribe({
            next: () => {
               this.countriesShown = showCountries(this.filteredCountries)
               sessionStorage.setItem('country', text)
            },
            error: (e) => {
               this.resetLists()
               this.cleanStorage('all')
               this.matSnackBar.open(e.message, 'X', { duration: 3000 })
            }
         })
   }

   private searchByRegion (): void {
      if (this.selectedRegion === null) return

      this.countriesService.getByRegion(this.selectedRegion, this.headers).subscribe({
         next: (countries) => {
            this.filteredCountries = countries
            this.countriesShown = showCountries(this.filteredCountries)
         },
         error: (e) => {
            this.resetLists()
            this.cleanStorage('all')
            this.matSnackBar.open(e.message, 'X', { duration: 3000 })
         }
      })
   }

   private filterByRegion (): void {
      if (this.selectedRegion === null) {
         this.filteredCountries = [...this.countriesList]
         return
      }

      this.filteredCountries = this.countriesList.filter(country => {
         const countryRegion = country.continent.toLowerCase()

         return countryRegion === this.selectedRegion
      })
   }

   private resetLists (): void {
      this.countriesList = []
      this.filteredCountries = []
      this.countriesShown = []
   }

   private cleanStorage (string: 'all' | 'country' | 'region'): void {
      switch (string) {
         case 'country':
            sessionStorage.removeItem('country')
            break
         case 'region':
            sessionStorage.removeItem('region')
            break
         default:
            sessionStorage.removeItem('country')
            sessionStorage.removeItem('region')
            break
      }
   }

   @HostListener('document:scroll')
   onScroll (): void {
      const cards = addCards(this.countriesShown, this.filteredCountries)

      if (cards !== undefined) this.countriesShown = cards
   }
}
