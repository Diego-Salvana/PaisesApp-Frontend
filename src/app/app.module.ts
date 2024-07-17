import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { AngularMaterialModule } from './angular-material/angular-material.module'
import { AppRoutingModule } from './app-routing.module'
import { SharedModule } from './shared/shared.module'

import { AppComponent } from './app.component'
import { UserProfileComponent } from './auth/components/user-profile/user-profile.component'

@NgModule({
   declarations: [AppComponent, UserProfileComponent],
   imports: [
      AngularMaterialModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      SharedModule
   ],
   bootstrap: [AppComponent]
})
export class AppModule {}
