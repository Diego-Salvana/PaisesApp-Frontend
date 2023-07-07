import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { RegionsComponent } from './pages/regions/regions.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CapitalsComponent } from './pages/capitals/capitals.component';
import { CountryComponent } from './pages/country/country.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { VerifyTokenGuard } from '../guards/verify-token.guard';

const routes: Routes = [
   { path: 'home', component: HomeComponent },
   {
      path: 'search',
      component: SearchComponent,
      children: [
         { path: 'by-country', component: CountriesComponent },
         { path: 'country/:id', component: CountryComponent },
         { path: 'by-capital', component: CapitalsComponent },
         { path: 'by-region/:id', component: RegionsComponent },
         {
            path: 'favorites',
            component: FavoritesComponent,
            canActivate: [VerifyTokenGuard],
         },
         { path: '**', redirectTo: 'by-country' },
      ],
   },
   { path: '**', redirectTo: 'home' },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class CountriesRoutingModule {}
