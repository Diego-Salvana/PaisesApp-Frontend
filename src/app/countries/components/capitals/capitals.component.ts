import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs'

import { CountriesService } from '../../services/countries.service'
import { LoaderService } from '../../services/loader.service'
import { HttpHeaders } from '@angular/common/http'
import { CountryCard } from 'src/app/interfaces/Country.interface'

@Component({
   selector: 'app-capitals',
   templateUrl: './capitals.component.html',
   styleUrls: ['./capitals.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapitalsComponent implements OnInit {
   private headers = new HttpHeaders({ loader: 'on' })
   countriesList: CountryCard[] = []
   sessionCapitalTerm: string | null = sessionStorage.getItem('capital')
   isLoading$: Observable<boolean> = this.loaderService.isLoading$

   constructor (
      private countriesService: CountriesService,
      private loaderService: LoaderService,
      private matSnackBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      if (this.sessionCapitalTerm !== null) this.searchCountries(this.sessionCapitalTerm)
   }

   searchCountries (text?: string): void {
      if (text === undefined || text.trim().length < 1) {
         this.countriesList = []
         sessionStorage.removeItem('capital')
         return
      }

      this.countriesService.getByCapital(text, this.headers).subscribe({
         next: (countries) => {
            this.countriesList = countries
            sessionStorage.setItem('capital', text)
         },
         error: (e) => {
            this.countriesList = []
            sessionStorage.removeItem('capital')
            this.matSnackBar.open(e.message, 'X', { duration: 3000 })
         }
      })
   }
}
