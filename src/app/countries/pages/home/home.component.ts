import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
   constructor (private router: Router) {}

   searchCountry (term?: string): void {
      if (term === undefined || term.length < 1) return this.goSearch()

      sessionStorage.setItem('country', term)
      sessionStorage.removeItem('region')
      void this.router.navigate(['/search', 'by-country'])
   }

   goSearch (): void {
      sessionStorage.removeItem('country')
      void this.router.navigate(['/search'])
   }
}
