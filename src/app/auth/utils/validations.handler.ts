import { FormControl, ValidationErrors } from '@angular/forms'

const emailValidator = (control: FormControl): ValidationErrors | null => {
   const emailRegExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
   const email = control.value

   return emailRegExp.test(email)
      ? null
      : { wrongEmailFormat: true }
}

const passwordMatchValidator = (confirmPassword: FormControl): ValidationErrors | null => {
   const password = confirmPassword.root.get('newPassword') ?? confirmPassword.root.get('password')

   return (password !== null) && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null
}

const usernameError = (field: FormControl): string => {
   return field.hasError('required')
      ? 'El campo es requerido.'
      : 'Máximo 20 caracteres.'
}

const emailError = (field: FormControl): string => {
   return field.hasError('required')
      ? 'El campo es requerido.'
      : 'Formato de email incorrecto.'
}

const passwordError = (field: FormControl): string => {
   return field.hasError('required')
      ? 'El campo es requerido.'
      : 'Mínimo 6 caracteres.'
}

const confirmPasswordError = (field: FormControl): string => {
   if (field.hasError('required')) return 'El campo es requerido.'
   else if (field.hasError('minlength')) return 'Mínimo 6 caracteres.'
   else return 'Las contraseñas no coinciden.'
}

const validationErrorTexts = {
   usernameError,
   emailError,
   passwordError,
   confirmPasswordError
}

export { emailValidator, passwordMatchValidator, validationErrorTexts }
