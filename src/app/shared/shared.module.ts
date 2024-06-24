import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { AngularMaterialModule } from '../angular-material/angular-material.module'
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor'
import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component'
import { LoaderInterceptor } from './interceptors/loader.interceptor'

@NgModule({
   declarations: [GoBackButtonComponent],
   imports: [CommonModule, AngularMaterialModule],
   exports: [GoBackButtonComponent],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
   ]
})
export class SharedModule { }
