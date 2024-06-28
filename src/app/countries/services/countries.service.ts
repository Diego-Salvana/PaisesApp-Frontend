import { HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { RestCountryModel } from '../models/rest-country.model'

import { Border, Country, CountryCard } from 'src/app/interfaces/Country.interface'

@Injectable({
   providedIn: 'root'
})
export class CountriesService {
   constructor (private model: RestCountryModel) { }

   getByName (name: string, headers?: HttpHeaders): Observable<CountryCard[]> {
      return this.model.getByName(name, headers)
   }

   getByCapital (capital: string, headers?: HttpHeaders): Observable<CountryCard[]> {
      return this.model.getByCapital(capital, headers)
   }

   getByRegion (region: string, headers?: HttpHeaders): Observable<CountryCard[]> {
      return this.model.getByRegion(region, headers)
   }

   getByCodeList (codeList: string[]): Observable<CountryCard[]> {
      return this.model.getByCodeList(codeList)
   }

   getByCode3 (code3: string): Observable<Country> {
      return this.model.getByCode3(code3)
   }

   getBorders (codes: string[]): Observable<Border[]> {
      return this.model.getBorders(codes)
   }
}
