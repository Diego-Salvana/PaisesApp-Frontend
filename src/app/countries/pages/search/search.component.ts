import { Component, OnInit, OnDestroy } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
   selector: 'app-search',
   templateUrl: './search.component.html',
   styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
   private readonly minWidthLarge: string = '(min-width: 1280px)'
   private readonly xSmallWidth: string = '(max-width: 599.98px)'
   private subscription = new Subscription()
   sidenavMode: MatDrawerMode = 'over'
   sidenavOpened!: boolean
   sidenavDisableClose!: boolean
   isLarge!: boolean
   isXSmall!: boolean
   loggedUser?: string

   constructor (private breakpointObserver: BreakpointObserver, private authSvc: AuthService) {}

   ngOnInit (): void {
      this.subscription = this.authSvc.currentUser$.subscribe(
         user => (this.loggedUser = user.username)
      )

      this.breakpointObserver
         .observe([this.xSmallWidth, this.minWidthLarge])
         .subscribe(({ breakpoints }) => {
            // Screens < 600px
            breakpoints[this.xSmallWidth] ? (this.isXSmall = true) : (this.isXSmall = false)

            // Screens > 1280px
            if (breakpoints[this.minWidthLarge]) {
               this.isLarge = true
               this.sidenavMode = 'side'
               this.sidenavOpened = true
               this.sidenavDisableClose = true
            } else {
               this.isLarge = false
               this.sidenavMode = 'over'
               this.sidenavOpened = false
               this.sidenavDisableClose = false
            }
         })
   }

   ngOnDestroy (): void {
      this.breakpointObserver.ngOnDestroy()
      this.subscription.unsubscribe()
   }

   logout (): void {
      this.authSvc.logOut()
   }

   close (sidenav: MatSidenav): void {
      if (!this.isLarge) void sidenav.close()
   }
}
