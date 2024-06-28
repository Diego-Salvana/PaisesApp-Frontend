import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'
import { FavoriteService } from 'src/app/auth/services/favorite.service'
import { CurrentUser } from 'src/app/interfaces/AuthUser.interface'
import { CountryCard } from 'src/app/interfaces/Country.interface'

@Component({
   selector: 'app-card-country',
   templateUrl: './card-country.component.html',
   styleUrls: ['./card-country.component.css']
})
export class CardCountryComponent implements OnInit {
   @Input() country!: CountryCard
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
      void this.router.navigate(['/search', 'country', this.country.code3])
   }

   addFavorite (evento: Event): void {
      evento.stopPropagation()
      this.favoriteSvc.addFavorite(this.country.code3)
   }

   removeFavorite (evento: Event): void {
      evento.stopPropagation()
      this.favoriteSvc.removeFavorite(this.country.code3)
      this.onFavoriteRemoved.emit(this.country.code3)
   }
}
