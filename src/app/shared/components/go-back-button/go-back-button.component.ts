import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { RouteHistoryService } from '../../services/route-history.service'
import { Router } from '@angular/router'

@Component({
   selector: 'app-go-back-button',
   templateUrl: './go-back-button.component.html',
   styleUrls: ['./go-back-button.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoBackButtonComponent {
   @Input() showArrow: boolean = true
   @Input() whiteBtn: boolean = false
   private readonly defaultPreviousUrl = '/search/by-country'

   constructor (private routeHistoryService: RouteHistoryService, private router: Router) { }

   goBack (): void {
      const prevUrl = this.routeHistoryService.getPreviousUrl() ?? this.defaultPreviousUrl

      void this.router.navigateByUrl(prevUrl)
   }
}
