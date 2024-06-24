import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AngularMaterialModule } from '../angular-material/angular-material.module'
import { CountriesRoutingModule } from './countries-routing.module'
import { SharedModule } from '../shared/shared.module'

import { CapitalsComponent } from './components/capitals/capitals.component'
import { CardCountryComponent } from './components/card-country/card-country.component'
import { CountriesComponent } from './components/countries/countries.component'
import { CountryComponent } from './components/country/country.component'
import { FavoritesComponent } from './components/favorites/favorites.component'
import { HomeComponent } from './pages/home/home.component'
import { InputFilterComponent } from './components/input-filter/input-filter.component'
import { InputSearchComponent } from './components/input-search/input-search.component'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { RegionTraductorPipe } from './pipes/region-traductor.pipe'
import { SearchComponent } from './pages/search/search.component'

@NgModule({
   declarations: [
      CapitalsComponent,
      CardCountryComponent,
      CountriesComponent,
      CountryComponent,
      FavoritesComponent,
      HomeComponent,
      InputFilterComponent,
      InputSearchComponent,
      NavBarComponent,
      RegionTraductorPipe,
      SearchComponent
   ],
   imports: [
      AngularMaterialModule,
      CommonModule,
      CountriesRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule
   ]
})
export class CountriesModule {}
