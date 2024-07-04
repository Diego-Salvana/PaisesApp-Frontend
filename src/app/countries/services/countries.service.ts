import { HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, of } from 'rxjs'
import { RestCountryModel } from '../models/rest-country.model'

import { Border, Country, CountryCard } from 'src/app/interfaces/Country.interface'

@Injectable({
   providedIn: 'root'
})
export class CountriesService {
   constructor (private model: RestCountryModel) { }

   getByName (name: string, headers?: HttpHeaders): Observable<CountryCard[]> {
      return this.model.getByName(name.trim(), headers).pipe(
         catchError((e: HttpErrorResponse) => {
            const message = this.generateMessageError(e, name)

            throw new Error(message)
         })
      )
   }

   getByCapital (capital: string, headers?: HttpHeaders): Observable<CountryCard[]> {
      return this.model.getByCapital(capital.trim(), headers).pipe(
         catchError((e: HttpErrorResponse) => {
            const message = this.generateMessageError(e, capital)
            
            throw new Error(message)
         })
      )
   }

   getByRegion (region: string, headers?: HttpHeaders): Observable<CountryCard[]> {
      return this.model.getByRegion(region.trim(), headers).pipe(
         catchError((e: HttpErrorResponse) => {
            throw new Error('Error al obtener países por continente')
         })
      )
   }

   getByCodeList (codeList: string[]): Observable<CountryCard[]> {
      return this.model.getByCodeList(codeList).pipe(
         catchError((e: HttpErrorResponse) => {
            throw new Error('Error al obtener favoritos')
         })
      )
   }

   getByCode3 (code3: string, headers?: HttpHeaders): Observable<Country> {
      return this.model.getByCode3(code3, headers).pipe(
         catchError((e: HttpErrorResponse) => {
            throw new Error('Error al obtener país')
         })
      )
   }

   getBorders (codes: string[], headers?: HttpHeaders): Observable<Border[]> {
      return this.model.getBorders(codes, headers).pipe(
         catchError((e: HttpErrorResponse) => {
            if (e.status === 400) return of([])

            throw new Error('Error al obtener limítrofes')
         })
      )
   }

   private generateMessageError (e: HttpErrorResponse, name: string): string {
      switch (e.status) {
         case 404:
            return `Sin resultados para "${name}"`
         default:
            return 'Error al obtener países'
      }
   }
}
