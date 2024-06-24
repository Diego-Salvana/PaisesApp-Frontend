import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css']
})
export class HomeComponent {
   constructor (private router: Router) {}

   searchCountry (term: string): void {
      sessionStorage.setItem('country', term)
      sessionStorage.removeItem('region')
      void this.router.navigate(['/search', 'by-country'])
   }
}
