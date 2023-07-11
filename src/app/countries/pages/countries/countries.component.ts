import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CountriesService } from '../../services/countries.service';
import { FavoriteService } from 'src/app/auth/services/favorite.service';
import { LoaderService } from '../../services/loader.service';
import { Country } from 'src/app/interfaces/CountryRest.interface';

@Component({
   selector: 'app-countries',
   templateUrl: './countries.component.html',
   styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit, OnDestroy {
   private favoritesCountries: string[] = [];
   private subscription = new Subscription();
   private headers = new HttpHeaders({ loader: 'on' });
   countriesList: Country[] = [];
   selectedRegion: string = sessionStorage.getItem('region') || '';
   termSessionCountry: string = sessionStorage.getItem('country') || '';
   countriesForm = this.fb.group({
      region: [this.selectedRegion],
   });
   isLoading$: Observable<boolean> = this.loaderSvc.isLoading$;

   constructor(
      private fb: FormBuilder,
      private countriesSvc: CountriesService,
      private favoriteSvc: FavoriteService,
      private loaderSvc: LoaderService,
      private matSnackBar: MatSnackBar
   ) {}

   ngOnInit(): void {
      if (this.termSessionCountry) this.searchCountries(this.termSessionCountry);

      this.subscription = this.favoriteSvc.favoritesList$.subscribe(
         (favList) => (this.favoritesCountries = favList)
      );

      this.countriesForm.valueChanges.subscribe(() => {
         this.selectedRegion = <string>this.countriesForm.get('region')?.value;
         this.selectedRegion
            ? sessionStorage.setItem('region', this.selectedRegion)
            : sessionStorage.removeItem('region');
      });
   }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }

   searchCountries(text: string): void {
      this.countriesSvc
         .getByName(text, this.headers)
         .pipe(
            map((countries) =>
               countries.filter((country) => {
                  const countryRegion = country.region.toLowerCase();
                  return countryRegion === (this.selectedRegion || countryRegion);
               })
            ),
            tap((filteredCountries) => {
               if (filteredCountries.length < 1) throw new Error(`No results for "${text}"`);
            })
         )
         .subscribe({
            next: (filteredCountries) => {
               this.countriesList = filteredCountries;
               sessionStorage.setItem('country', text);
            },
            error: (error) => {
               console.error(error);
               this.countriesList = [];
               sessionStorage.removeItem('country');
               this.matSnackBar.open(`Sin resultados para "${text}"`, 'X', { duration: 3000 });
            },
         });
   }

   checkIsFavorite(cca3: string): boolean {
      return this.favoritesCountries.includes(cca3);
   }
}
