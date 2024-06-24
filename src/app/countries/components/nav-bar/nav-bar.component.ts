import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
   selector: 'app-nav-bar',
   templateUrl: './nav-bar.component.html',
   styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
   @Output() onMenuClick = new EventEmitter()
   @Output() onFavClick = new EventEmitter()
   isHome: boolean
   loggedUser: string = ''
   private subscription = new Subscription()

   constructor (private authSvc: AuthService, private route: ActivatedRoute) {
      const path = this.route.snapshot.routeConfig?.path
      path === 'home' ? (this.isHome = true) : (this.isHome = false)
   }

   ngOnInit (): void {
      this.subscription = this.authSvc.currentUser$.subscribe(
         user => (this.loggedUser = user.username ?? '')
      )
   }

   ngOnDestroy (): void {
      this.subscription.unsubscribe()
   }

   menuClick (): void {
      this.onMenuClick.emit()
   }

   favoriteClick (): void {
      this.onFavClick.emit()
   }

   logout (): void {
      this.authSvc.logOut()
   }

   profileAlert (): void {
      alert('Sección de prefil en desarrollo. ¡Pronto estará disponible!')
   }
}
