import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

import { Country } from 'src/app/interfaces/CountryRest.interface'

@Injectable({
   providedIn: 'root'
})
export class CountriesService {
   private baseUrl: string = environment.baseCountriesUrl
   cardParams = new HttpParams().set(
      'fields',
      'name,region,capital,flags,population,cca3,translations'
   )

   borderParams = new HttpParams().set('fields', 'cca3,translations')
   fullCountryParams = new HttpParams().set(
      'fields',
      'name,area,region,capital,timezones,landlocked,maps,borders,flags,population,cca3,translations'
   )

   constructor (private http: HttpClient) {}

   getAll (): Observable<Country[]> {
      return this.http.get<Country[]>(`${this.baseUrl}/all`)
   }

   getByName (name: string, headers?: HttpHeaders): Observable<Country[]> {
      return this.http.get<Country[]>(`${this.baseUrl}/translation/${name}`, {
         params: this.cardParams,
         headers
      })
   }

   getByCapital (capital: string, headers?: HttpHeaders): Observable<Country[]> {
      return this.http.get<Country[]>(`${this.baseUrl}/capital/${capital}`, {
         params: this.cardParams,
         headers
      })
   }

   getByRegion (region: string, headers?: HttpHeaders): Observable<Country[]> {
      return this.http.get<Country[]>(`${this.baseUrl}/region/${region}`, {
         params: this.cardParams,
         headers
      })
   }

   getByCca3 (cca3: string[] | string, fieldParams?: HttpParams): Observable<Country[]> {
      const cca3Codes: string = typeof cca3 === 'string' ? cca3 : cca3.join()
      return this.http.get<Country[]>(`${this.baseUrl}/alpha?codes=${cca3Codes}`, {
         params: fieldParams
      })
   }
}
