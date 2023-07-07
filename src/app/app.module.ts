import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      AngularMaterialModule,
      HttpClientModule,
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
