import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthService } from '../../services/auth.service'
import { emailValidator, passwordMatchValidator, validationErrorTexts } from '../../utils/validations.handler'
import { RegisterForm } from 'src/app/interfaces/AuthUser.interface'

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css']
   
})
export class RegisterComponent implements OnInit {
   registerForm: FormGroup<RegisterForm> = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), passwordMatchValidator]]
   })

   hidePass: boolean = true
   hideRePass: boolean = true
   btnDisabled = false
   errorTexts = validationErrorTexts

   constructor (
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private matSnakBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      this.registerForm.controls.password.valueChanges.subscribe(() => {
         const confirmPassword = this.registerForm.controls.confirmPassword
         
         confirmPassword.setValue(confirmPassword.value)
      })
   }

   submitForm (): void {
      if (this.registerForm.invalid) return

      this.btnDisabled = true
      const { username, email, password } = this.registerForm.value

      this.authService.registerUser({ username, email, password }).subscribe({
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
