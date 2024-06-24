import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs'

@Injectable({
   providedIn: 'root'
})
export class RouteHistoryService {
   private readonly segmentCheck = ['auth', 'country']
   private previousUrl: string | null = null
   private currentUrl: string | null = null

   constructor (private route: Router) {
      this.route.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe(event_ => {
            const event = event_ as NavigationEnd
            
            if (this.currentUrl !== null) {
               const currentUrlArray = this.currentUrl.split('/')
               const penultimateElemCurrentUrl = currentUrlArray[currentUrlArray.length - 2]
               const urlRedirects = event.urlAfterRedirects.split('/')
               const penultimateElemRedirects = urlRedirects[urlRedirects.length - 2]
               
               if (
                  !this.segmentCheck.includes(penultimateElemCurrentUrl) ||
                  penultimateElemCurrentUrl !== penultimateElemRedirects
               ) {
                  this.previousUrl = this.currentUrl
               }
            }

            this.currentUrl = event.urlAfterRedirects
         })
   }

   getPreviousUrl (): string | null {
      return this.previousUrl
   }
}
