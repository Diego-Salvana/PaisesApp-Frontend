import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { AngularMaterialModule } from '../angular-material/angular-material.module'
import { AuthRoutingModule } from './auth-routing.module'
import { SharedModule } from '../shared/shared.module'

import { LoginComponent } from './components/login/login.component'
import { MainComponent } from './pages/main/main.component'
import { RegisterComponent } from './components/register/register.component'

@NgModule({
   declarations: [MainComponent, LoginComponent, RegisterComponent],
   imports: [AngularMaterialModule, AuthRoutingModule, CommonModule, ReactiveFormsModule, SharedModule]
})
export class AuthModule {}
