import { Observable } from 'rxjs'
import { HttpHeaders } from '@angular/common/http'
import { Border, Country, CountryCard } from './Country.interface'

export interface ICountryModel {
   getByName: (name: string, headers?: HttpHeaders) => Observable<CountryCard[]>
   getByCapital: (capital: string, headers?: HttpHeaders) => Observable<CountryCard[]>
   getByRegion: (region: string, headers?: HttpHeaders) => Observable<CountryCard[]>
   getByCodeList: (codeList: string[]) => Observable<CountryCard[]>
   getByCode3: (code3: string, headers?: HttpHeaders) => Observable<Country>
   getBorders: (codes: string[], headers?: HttpHeaders) => Observable<Border[]>
}
