import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
   declarations: [MainComponent, LoginComponent, RegisterComponent],
   imports: [CommonModule, AuthRoutingModule, AngularMaterialModule, ReactiveFormsModule],
})
export class AuthModule {}
