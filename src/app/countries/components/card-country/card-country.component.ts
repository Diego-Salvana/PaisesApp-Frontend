import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'
import { FavoriteService } from 'src/app/auth/services/favorite.service'
import { CurrentUser } from 'src/app/interfaces/AuthUser.interface'
import { CountryCard } from 'src/app/interfaces/Country.interface'

@Component({
   selector: 'app-card-country',
   templateUrl: './card-country.component.html',
   styleUrls: ['./card-country.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCountryComponent implements OnInit {
   @Input() country!: CountryCard
   @Output() onFavoriteRemoved = new EventEmitter<string>()
   isFavorite = false
   user$!: Observable<CurrentUser>

   constructor (
      private router: Router,
      private favoriteService: FavoriteService,
      private authService: AuthService
   ) {}

   ngOnInit (): void {
      this.user$ = this.authService.currentUser$

      this.checkIsFavorite()
   }

   goToCountry (): void {
      void this.router.navigate(['/search', 'country', this.country.code3])
   }

   addFavorite (event: Event): void {
      event.stopPropagation()
      this.favoriteService.addFavorite(this.country.code3)
      this.checkIsFavorite()
   }

   removeFavorite (event: Event): void {
      event.stopPropagation()
      this.favoriteService.removeFavorite(this.country.code3)
      this.onFavoriteRemoved.emit(this.country.code3)
      this.checkIsFavorite()
   }

   private checkIsFavorite (): void {
      this.isFavorite = this.favoriteService.checkIsFavorite(this.country.code3)
   }
}
