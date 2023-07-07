import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyTokenGuard } from './guards/verify-token.guard';

const routes: Routes = [
   {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      canLoad: [VerifyTokenGuard],
      canActivate: [VerifyTokenGuard],
   },
   {
      path: '',
      loadChildren: () =>
         import('./countries/countries.module').then((m) => m.CountriesModule),
   },
   { path: '**', redirectTo: '' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
