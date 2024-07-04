import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'

import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
   selector: 'app-nav-bar',
   templateUrl: './nav-bar.component.html',
   styleUrls: ['./nav-bar.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, OnDestroy {
   @Output() onMenuClick = new EventEmitter()
   @Output() onProfileClick = new EventEmitter()
   private subscription = new Subscription()
   loggedUser = new BehaviorSubject<string | null>(null)
   isHome: boolean

   constructor (
      private authSvc: AuthService,
      private route: ActivatedRoute
   ) {
      const path = this.route.snapshot.routeConfig?.path

      path === 'home' ? (this.isHome = true) : (this.isHome = false)
   }

   ngOnInit (): void {
      this.subscription = this.authSvc.currentUser$.subscribe(
         user => this.loggedUser.next(user.username ?? null)
      )
   }

   ngOnDestroy (): void {
      this.subscription.unsubscribe()
   }

   menuClick (): void {
      this.onMenuClick.emit()
   }

   profileClick (): void {
      this.onProfileClick.emit()
   }

   logout (): void {
      this.authSvc.logOut()
   }

   profileAlert (): void {
      alert('Sección de prefil en desarrollo. ¡Pronto estará disponible!')
   }
}
