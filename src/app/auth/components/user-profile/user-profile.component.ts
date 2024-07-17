import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'
import { jwtDecode } from 'jwt-decode'
import { AuthService } from '../../services/auth.service'
import { passwordMatchValidator, validationErrorTexts } from '../../utils/validations.handler'
import { JwtPayloadExt, PasswordForm, UsernameForm } from 'src/app/interfaces/AuthUser.interface'

@Component({
   selector: 'app-user-profile',
   templateUrl: './user-profile.component.html',
   styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
   private userSubscription!: Subscription
   usernameForm: FormGroup<UsernameForm> = this.formBuilder.group({
      newUsername: ['', [Validators.required, Validators.maxLength(20)]]
   })

   passwordForm: FormGroup<PasswordForm> = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6), passwordMatchValidator]]
   })
   
   userEmail: string = ''
   hidePass: boolean = true
   hideRePass: boolean = true
   errorTexts = validationErrorTexts

   constructor (
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private matSnakBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      document.documentElement.scrollTo({ top: 0 })

      this.passwordForm.controls.newPassword.valueChanges.subscribe(() => {
         const confirmPassword = this.passwordForm.controls.confirmNewPassword

         confirmPassword.setValue(confirmPassword.value)
      })

      this.userSubscription = this.authService.currentUser$.subscribe(user => {
         this.usernameForm.controls.newUsername.setValue(user.username)
      })

      try {
         const payload: JwtPayloadExt = jwtDecode(localStorage.getItem('JWToken') ?? '')

         if (payload.email !== undefined) this.userEmail = payload.email
      } catch (e) {
         this.userEmail = ''
         this.matSnakBar.open('Error al obtener email de usuario', 'X', { duration: 3000 })
         this.usernameForm.reset()
         this.passwordForm.reset()
      }
   }

   ngOnDestroy (): void {
      this.userSubscription.unsubscribe()
   }

   submitForm (form: FormGroup, formElement: HTMLFormElement): void {
      if (form.get('password') !== null) {
         Object.keys(form.controls).forEach(key => form.get(key)?.setValue(form.controls[key].value))
      }
      
      if (form.invalid) return

      formElement.toggleAttribute('btn-disabled', true)
      this.authService.updateUser(form.value).subscribe({
         next: () => {
            formElement.toggleAttribute('btn-disabled', false)
            this.matSnakBar.open('Datos de usuario actualizados', 'X', { duration: 3000 })

            if (form.get('password') !== null) {
               form.reset()
               Object.keys(form.controls).forEach(key => form.get(key)?.setErrors(null))
            }
         },
         error: (e) => {
            formElement.toggleAttribute('btn-disabled', false)
            this.matSnakBar.open(e.message, 'X', { duration: 3000 })
         }
      })
   }
}
