import { FormControl, ValidationErrors } from '@angular/forms';

const emailValidator = (control: FormControl): ValidationErrors | null => {
   const emailRegExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
   const email = control.value;

   return emailRegExp.test(email) ? null : { wrongEmailFormat: true };
};

const passwordMatchValidator = (confirmPassword: FormControl): ValidationErrors | null => {
   const password = confirmPassword.root.get('password');

   return password && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
};

export { emailValidator, passwordMatchValidator };
