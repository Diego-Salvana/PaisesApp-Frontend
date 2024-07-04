import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { switchMap, tap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'

import { CountriesService } from '../../services/countries.service'
import { Border, Country } from 'src/app/interfaces/Country.interface'
import { BehaviorSubject } from 'rxjs'

@Component({
   selector: 'app-country',
   templateUrl: './country.component.html',
   styleUrls: ['./country.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryComponent implements OnInit {
   country!: Country
   borders: Border[] = []
   loadingCountry = new BehaviorSubject<boolean>(true)
   loadingBorders = new BehaviorSubject<boolean>(true)

   constructor (
      private activatedRoute: ActivatedRoute,
      private countriesService: CountriesService,
      private matSnackBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      this.activatedRoute.params
         .pipe(
            switchMap(({ id: cca3 }) => {
               this.loadingCountry.next(true)
               return this.countriesService.getByCode3(cca3)
            }),
            tap(country => {
               this.country = country
               this.loadingCountry.next(false)
            }),
            switchMap(country => {
               this.loadingBorders.next(true)
               return this.countriesService.getBorders(country.borders)
            })
         )
         .subscribe({
            next: (borderCountries) => {
               this.borders = borderCountries
               this.loadingBorders.next(false)
            },
            error: (e) => {
               this.loadingCountry.next(false)
               this.loadingBorders.next(false)
               this.matSnackBar.open(e.message, 'X', { duration: 3000 })
            }
         })
   }
}
