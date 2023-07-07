import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { CountriesService } from '../../services/countries.service';
import { Country } from 'src/app/interfaces/CountryRest.interface';

@Component({
   selector: 'app-country',
   templateUrl: './country.component.html',
   styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
   country!: Country;
   borders: Country[] = [];
   nativeName: string = '';

   constructor(
      private activatedRoute: ActivatedRoute,
      private countriesSvc: CountriesService
   ) {}

   ngOnInit(): void {
      this.activatedRoute.params
         .pipe(
            switchMap(({ id: cca3 }) =>
               this.countriesSvc.getByCca3(cca3, this.countriesSvc.fullCountryParams)
            ),
            tap(([country]) => (this.country = country)),
            tap(([country]) => {
               const firstKey = Object.keys(<object>country.name.nativeName)[0];
               const nativeObj = country.name.nativeName || {};
               this.nativeName = nativeObj[`${firstKey}`].common;
            }),
            switchMap(([country]) =>
               this.countriesSvc.getByCca3(
                  country.borders || [],
                  this.countriesSvc.borderParams
               )
            )
         )
         .subscribe({
            next: (bordersCountries) => (this.borders = bordersCountries),
            error: (error) => {
               console.error(error);
            },
         });
   }
}
