import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CountriesRoutingModule } from './countries-routing.module';

import { CapitalsComponent } from './pages/capitals/capitals.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CountryComponent } from './pages/country/country.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegionsComponent } from './pages/regions/regions.component';
import { SearchComponent } from './pages/search/search.component';
import { CardCountryComponent } from './components/card-country/card-country.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { InputFilterComponent } from './components/input-filter/input-filter.component';
import { RegionTraductorPipe } from './pipes/region-traductor.pipe';

@NgModule({
   declarations: [
      CapitalsComponent,
      CountriesComponent,
      CountryComponent,
      FavoritesComponent,
      HomeComponent,
      NavBarComponent,
      RegionsComponent,
      SearchComponent,
      CardCountryComponent,
      InputSearchComponent,
      InputFilterComponent,
      RegionTraductorPipe,
   ],
   imports: [
      CommonModule,
      CountriesRoutingModule,
      AngularMaterialModule,
      FormsModule,
      ReactiveFormsModule,
   ],
})
export class CountriesModule {}
