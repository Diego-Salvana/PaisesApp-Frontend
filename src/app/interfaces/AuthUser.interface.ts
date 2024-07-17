import { FormControl } from '@angular/forms'
import { JwtPayload } from 'jwt-decode'

export interface Auth {
   email: string
   password: string
}

export interface User extends Auth {
   username: string
   favorites?: string[]
}

export interface ResponseUser {
   username: string
   favorites?: string[]
   JWToken: string
}

export interface ResponseFavorites {
   updatedFavorites: string[]
}

export interface CurrentUser {
   username?: string
}

export interface UpdateUser {
   newUsername?: string
   password?: string
   newPassword?: string
}

export interface JwtPayloadExt extends JwtPayload {
   email?: string
}

export interface UsernameForm {
   newUsername: FormControl
}

export interface PasswordForm {
   password: FormControl
   newPassword: FormControl
   confirmNewPassword: FormControl
}

export interface RegisterForm {
   username: FormControl
   email: FormControl
   password: FormControl
   confirmPassword: FormControl
}

export interface LoginForm {
   email: FormControl
   password: FormControl
}
