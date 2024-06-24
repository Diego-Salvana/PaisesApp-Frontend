import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, OnDestroy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
   selector: 'app-main',
   templateUrl: './main.component.html',
   styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit, OnDestroy {
   @ViewChild('sectionForm') sectionForm!: ElementRef<HTMLElement>
   private subscription = new Subscription()

   constructor (private router: Router, private renderer2: Renderer2) {}

   ngAfterViewInit (): void {
      const sectionFormElement = this.sectionForm.nativeElement
      const currentPath = this.router.url.split('/')[2]
      currentPath === 'login'
         ? this.renderer2.addClass(sectionFormElement, 'padding-top-login')
         : this.renderer2.addClass(sectionFormElement, 'padding-top-register')

      // TODO: filtrar evento como en servicio de historial de rutas
      this.subscription = this.router.events.subscribe((event) => {
         if (event instanceof NavigationEnd) {
            const currentPath = event.url.split('/')[2]
            if (currentPath === 'login') {
               this.renderer2.addClass(sectionFormElement, 'padding-top-login')
               this.renderer2.removeClass(sectionFormElement, 'padding-top-register')
            } else {
               this.renderer2.removeClass(sectionFormElement, 'padding-top-login')
               this.renderer2.addClass(sectionFormElement, 'padding-top-register')
            }
         }
      })
   }

   ngOnDestroy (): void {
      this.subscription.unsubscribe()
   }
}
