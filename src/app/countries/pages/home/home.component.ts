import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
})
export class HomeComponent {
   constructor(private router: Router) {}

   searchCountry(term: string) {
      sessionStorage.setItem('country', term);
      sessionStorage.removeItem('region');
      this.router.navigate(['/search', 'by-country']);
   }
}
