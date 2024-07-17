import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { emailValidator, validationErrorTexts } from '../../utils/validations.handler'
import { LoginForm } from 'src/app/interfaces/AuthUser.interface'

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent {
   loginForm: FormGroup<LoginForm> = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
   })

   hide: boolean = true
   btnDisabled = false
   errorTexts = validationErrorTexts

   constructor (
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private matSnakBar: MatSnackBar
   ) {}

   submitForm (): void {
      if (this.loginForm.invalid) return

      this.btnDisabled = true
      const { email, password } = this.loginForm.value
      
      this.authService.loginUser({ email, password }).subscribe({
         next: () => {
            this.btnDisabled = false
            void this.router.navigate(['/search', 'by-country'])
         },
         error: (e) => {
            this.btnDisabled = false
            this.matSnakBar.open(e.message, 'X', { duration: 3000 })
         }
      })
   }
}
