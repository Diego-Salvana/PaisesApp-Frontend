import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { emailValidator } from '../../utils/validations.handler'

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent {
   loginForm: FormGroup = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
   })

   hide: boolean = true
   btnDisabled = false

   constructor (
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private matSnakBar: MatSnackBar
   ) {}

   submitForm (): void {
      if (this.loginForm.invalid) return

      this.btnDisabled = true
      this.authService.loginUser(this.loginForm.value).subscribe({
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

   emailError (): string {
      return this.loginForm.controls['email'].hasError('required')
         ? 'El campo es requerido.'
         : 'Formato de email incorrecto.'
   }

   passwordError (): string {
      return this.loginForm.controls['password'].hasError('required')
         ? 'El campo es requerido.'
         : 'Mínimo 6 caracteres.'
   }
}
