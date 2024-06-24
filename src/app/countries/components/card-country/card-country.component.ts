import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'
import { FavoriteService } from 'src/app/auth/services/favorite.service'
import { CurrentUser } from 'src/app/interfaces/AuthUser.interface'
import { Country } from 'src/app/interfaces/CountryRest.interface'

@Component({
   selector: 'app-card-country',
   templateUrl: './card-country.component.html',
   styleUrls: ['./card-country.component.css']
})
export class CardCountryComponent implements OnInit {
   @Input() country!: Country
   @Input() isFavorite: boolean = false
   @Output() onFavoriteRemoved = new EventEmitter<string>()
   currentUser!: Observable<CurrentUser>

   constructor (
      private router: Router,
      private favoriteSvc: FavoriteService,
      private authSvc: AuthService
   ) {}

   ngOnInit (): void {
      this.currentUser = this.authSvc.currentUser$
   }

   goToCountry (): void {
      void this.router.navigate(['/search', 'country', this.country.cca3])
   }

   addFavorite (evento: Event): void {
      evento.stopPropagation()
      this.favoriteSvc.addFavorite(this.country.cca3)
   }

   removeFavorite (evento: Event): void {
      evento.stopPropagation()
      this.favoriteSvc.removeFavorite(this.country.cca3)
      this.onFavoriteRemoved.emit(this.country.cca3)
   }
}
