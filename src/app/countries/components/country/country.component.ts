import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { switchMap, tap } from 'rxjs/operators'

import { CountriesService } from '../../services/countries.service'
import { Border, Country } from 'src/app/interfaces/Country.interface'

@Component({
   selector: 'app-country',
   templateUrl: './country.component.html',
   styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
   country!: Country
   borders: Border[] = []
   nativeName: string = ''

   constructor (private activatedRoute: ActivatedRoute, private countriesService: CountriesService) {}

   ngOnInit (): void {
      this.activatedRoute.params
         .pipe(
            switchMap(({ id: cca3 }) =>
               this.countriesService.getByCode3(cca3)
            ),
            tap((country) => (this.country = country)),
            tap((country) => { this.nativeName = country.nativeName }),
            switchMap((country) =>
               this.countriesService.getBorders(country.borders)
            )
         )
         .subscribe({
            next: (bordersCountries) => (this.borders = bordersCountries),
            error: (error) => {
               console.error(error)
            }
         })
   }
}
