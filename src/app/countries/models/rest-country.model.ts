import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, map } from 'rxjs'
import { environment } from 'src/environments/environment'
import { RestCountry } from 'src/app/interfaces/CountryRest.interface'
import { Border, Country, CountryCard } from 'src/app/interfaces/Country.interface'
import { ICountryModel } from 'src/app/interfaces/CountryModel.interface'

@Injectable({
   providedIn: 'root'
})
export class RestCountryModel implements ICountryModel {
   private baseUrl: string = environment.baseCountriesUrl
   private cardParams = new HttpParams().set(
      'fields',
      'name,region,capital,flags,population,cca2,cca3,translations'
   )

   private fullCountryParams = new HttpParams().set(
      'fields',
      'name,area,region,capital,timezones,landlocked,maps,borders,flags,population,cca2,cca3,translations'
   )

   private borderParams = new HttpParams().set('fields', 'name,cca2,cca3,translations')

   constructor (private http: HttpClient) { }

   getByName (name: string, headers?: HttpHeaders): Observable<CountryCard[]> {
      return this.http.get<RestCountry[]>(`${this.baseUrl}/translation/${name}`, {
         params: this.cardParams,
         headers
      }).pipe(
         map(restCountries => {
            return this.generateCountryCardInfoList(restCountries)
         })
      )
   }

   getByCapital (capital: string, headers?: HttpHeaders): Observable<CountryCard[]> {
      return this.http.get<RestCountry[]>(`${this.baseUrl}/capital/${capital}`, {
         params: this.cardParams,
         headers
      }).pipe(
         map(restCountries => {
            return this.generateCountryCardInfoList(restCountries)
         })
      )
   }

   getByRegion (region: string, headers?: HttpHeaders): Observable<CountryCard[]> {
      return this.http.get<RestCountry[]>(`${this.baseUrl}/region/${region}`, {
         params: this.cardParams,
         headers
      }).pipe(
         map(restCountries => {
            return this.generateCountryCardInfoList(restCountries)
         })
      )
   }

   getByCodeList (codeList: string[]): Observable<CountryCard[]> {
      return this.http.get<RestCountry[]>(`${this.baseUrl}/alpha?codes=${codeList.join()}`, {
         params: this.cardParams
      }).pipe(
         map(restCountries => {
            return this.generateCountryCardInfoList(restCountries)
         })
      )
   }

   getByCode3 (code3: string, headers?: HttpHeaders): Observable<Country> {
      return this.http.get<RestCountry[]>(`${this.baseUrl}/alpha?codes=${code3}`, {
         params: this.fullCountryParams,
         headers
      }).pipe(
         map(([restCountry]) => {
            return this.generateCountryInfo(restCountry)
         })
      )
   }
   
   getBorders (codes: string[], headers?: HttpHeaders): Observable<Border[]> {
      return this.http.get<RestCountry[]>(`${this.baseUrl}/alpha?codes=${codes.join()}`, {
         params: this.borderParams,
         headers
      }).pipe(
         map(restCountries => {
            return this.generateBordersInfoList(restCountries)
         })
      )
   }

   private generateCountryCardInfoList (restCountries: RestCountry[]): CountryCard[] {
      return restCountries.reduce((list: CountryCard[], country) => {
         const countryCard: CountryCard = {
            name: country.name.common,
            nameSpa: country.translations['spa'].common,
            continent: country.region,
            capital: country.capital === undefined ? '-' : country.capital[0],
            population: country.population,
            code2: country.cca2,
            code3: country.cca3
         }

         list.push(countryCard)
         return list
      }, [])
   }

   private generateCountryInfo (restCountry: RestCountry): Country {
      const firstKey = Object.keys(restCountry.name.nativeName ?? {})[0]
      const nativeObj = restCountry.name.nativeName ?? {}
      const countryNativeName: string | undefined = nativeObj[`${firstKey}`].common

      const country: Country = {
         name: restCountry.name.common,
         nameSpa: restCountry.translations['spa'].common,
         nativeName: countryNativeName ?? '-',
         continent: restCountry.region,
         region: restCountry.region,
         capital: restCountry.capital === undefined ? '-' : restCountry.capital[0],
         population: restCountry.population,
         area: restCountry.area,
         landlocked: restCountry.landlocked,
         timezones: restCountry.timezones,
         map: restCountry.maps.googleMaps,
         borders: restCountry.borders ?? [],
         code2: restCountry.cca2,
         code3: restCountry.cca3
      }

      return country
   }

   private generateBordersInfoList (restCountries: RestCountry[]): Border[] {
      return restCountries.reduce((list: Border[], country) => {
         const countryCard: Border = {
            name: country.name.common,
            nameSpa: country.translations['spa'].common,
            code2: country.cca2,
            code3: country.cca3
         }

         list.push(countryCard)
         return list
      }, [])
   }
}
