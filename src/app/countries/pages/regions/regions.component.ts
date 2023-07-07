import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { CountriesService } from '../../services/countries.service';
import { FavoriteService } from 'src/app/auth/services/favorite.service';
import { LoaderService } from '../../services/loader.service';
import { Country } from 'src/app/interfaces/CountryRest.interface';

@Component({
   selector: 'app-regions',
   templateUrl: './regions.component.html',
   styleUrls: ['./regions.component.css'],
})
export class RegionsComponent implements OnInit, OnDestroy {
   private favoritesCountries: string[] = [];
   private subscription = new Subscription();
   private countriesList: Country[] = [];
   filteredCountriesList: Country[] = [];
   region: string = '';
   isLoading$: Observable<boolean> = this.loaderSvc.isLoading$;

   constructor(
      private activatedRoute: ActivatedRoute,
      private countriesSvc: CountriesService,
      private favoriteSvc: FavoriteService,
      private loaderSvc: LoaderService,
      private matSnackBar: MatSnackBar
   ) {}

   ngOnInit(): void {
      this.activatedRoute.params
         .pipe(
            tap(({ id }) => (this.region = id)),
            switchMap(({ id }) => this.countriesSvc.getByRegion(id))
         )
         .subscribe({
            next: (countries) => {
               this.countriesList = countries;
               this.filteredCountriesList = [...this.countriesList];
            },
            error: (err) => {
               console.error('Region error: ', err);
            },
         });

      this.subscription = this.favoriteSvc.favoritesList$.subscribe(
         (favList) => (this.favoritesCountries = favList)
      );
   }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }

   filterCountries(term: string): void {
      this.filteredCountriesList = this.countriesList.filter((country) => {
         const countryName = country.translations['spa'].common.toLowerCase();
         return countryName.includes(term.toLowerCase());
      });

      this.filteredCountriesList.length < 1
         ? this.matSnackBar.open(`Sin resultados para "${term}"`, 'X', { duration: 3000 })
         : this.matSnackBar.dismiss();
   }

   checkIsFavorite(cca3: string): boolean {
      return this.favoritesCountries.includes(cca3);
   }
}
