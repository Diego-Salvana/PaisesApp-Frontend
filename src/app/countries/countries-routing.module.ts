import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { SearchComponent } from './pages/search/search.component'
import { CountriesComponent } from './components/countries/countries.component'
import { CapitalsComponent } from './components/capitals/capitals.component'
import { CountryComponent } from './components/country/country.component'
import { FavoritesComponent } from './components/favorites/favorites.component'
import { VerifyTokenGuard } from '../shared/guards/verify-token.guard'

const routes: Routes = [
   { path: 'home', component: HomeComponent },
   {
      path: 'search',
      component: SearchComponent,
      children: [
         { path: 'by-country', component: CountriesComponent },
         { path: 'by-capital', component: CapitalsComponent },
         { path: 'country/:id', component: CountryComponent },
         { path: 'favorites', component: FavoritesComponent, canActivate: [VerifyTokenGuard] },
         { path: '**', redirectTo: 'by-country' }
      ]
   },
   { path: '**', redirectTo: 'home' }
]

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class CountriesRoutingModule {}
