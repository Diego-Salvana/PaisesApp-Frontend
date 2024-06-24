import { Component, OnInit } from '@angular/core'
import { AuthService } from './auth/services/auth.service'
import { RouteHistoryService } from './shared/services/route-history.service'

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   constructor (private authSvc: AuthService, private routeHistorySvc: RouteHistoryService) { }

   ngOnInit (): void {
      this.authSvc.validateToken().subscribe()
   }
}
