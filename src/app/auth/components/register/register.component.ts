import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { emailValidator, passwordMatchValidator } from '../../utils/validations.handler'

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   registerForm: FormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), passwordMatchValidator]]
   })

   hidePass: boolean = true
   hideRePass: boolean = true
   btnDisabled = false

   constructor (
      private formBuilder: FormBuilder,
      private authSvc: AuthService,
      private router: Router,
      private matSnakBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      this.registerForm.controls['password'].valueChanges.subscribe(() => {
         const confirmPassword = this.registerForm.controls['confirmPassword']
         confirmPassword.setValue(confirmPassword.value)
      })
   }

   submitForm (): void {
      if (this.registerForm.invalid) return

      this.btnDisabled = true
      this.authSvc.registerUser(this.registerForm.value).subscribe({
         next: () => {
            this.btnDisabled = false
            void this.router.navigate(['/search', 'by-country'])
         },
         error: (err) => {
            this.btnDisabled = false
            this.matSnakBar.open(err, 'X', { duration: 3000 })
         }
      })
   }

   emailError (): string {
      return this.registerForm.controls['email'].hasError('required')
         ? 'El campo es requerido.'
         : 'Formato de email incorrecto.'
   }

   passwordError (): string {
      return this.registerForm.controls['password'].hasError('required')
         ? 'El campo es requerido.'
         : 'Mínimo 6 caracteres.'
   }

   confirmPasswordError (): string {
      if (this.registerForm.controls['confirmPassword'].hasError('required')) { return 'El campo es requerido.' } else if (this.registerForm.controls['confirmPassword'].hasError('minlength')) { return 'Mínimo 6 caracteres.' } else return 'Las contraseñas no coinciden.'
   }
}
