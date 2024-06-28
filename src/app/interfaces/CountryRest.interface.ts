export interface RestCountry {
   altSpellings: string[]
   area: number
   borders?: string[]
   capital?: string[]
   capitalInfo: CapitalInfo
   car: Car
   cca2: string
   cca3: string
   ccn3?: string
   cioc?: string
   coatOfArms: CoatOfArms
   continents: Continent[]
   currencies?: Currencies
   demonyms?: Demonyms
   fifa?: string
   flag: string
   flags: Flags
   gini?: { [key: string]: number }
   idd: Idd
   independent?: boolean
   landlocked: boolean
   languages?: { [key: string]: string }
   latlng: number[]
   maps: Maps
   name: Name
   population: number
   postalCode?: PostalCode
   region: Region
   startOfWeek: StartOfWeek
   status: Status
   subregion?: string
   timezones: string[]
   tld?: string[]
   translations: { [key: string]: Translation }
   unMember: boolean
}

export interface CapitalInfo {
   latlng?: number[]
}

export interface Car {
   signs?: string[]
   side: Side
}

export enum Side {
   Left = 'left',
   Right = 'right',
}

export interface CoatOfArms {
   png?: string
   svg?: string
}

export enum Continent {
   Africa = 'Africa',
   Antarctica = 'Antarctica',
   Asia = 'Asia',
   Europe = 'Europe',
   NorthAmerica = 'North America',
   Oceania = 'Oceania',
   SouthAmerica = 'South America',
}

export interface Currencies {
   XCD?: Aed
   TOP?: Aed
   AUD?: Aed
   XAF?: Aed
   MGA?: Aed
   KWD?: Aed
   IQD?: Aed
   EUR?: Aed
   NPR?: Aed
   XOF?: Aed
   NGN?: Aed
   WST?: Aed
   USD?: Aed
   JMD?: Aed
   MNT?: Aed
   AZN?: Aed
   BGN?: Aed
   LYD?: Aed
   MAD?: Aed
   BYN?: Aed
   THB?: Aed
   LBP?: Aed
   BRL?: Aed
   PGK?: Aed
   ZWL?: Aed
   AOA?: Aed
   RWF?: Aed
   LAK?: Aed
   NIO?: Aed
   CRC?: Aed
   TMT?: Aed
   INR?: Aed
   DZD?: Aed
   MRU?: Aed
   SRD?: Aed
   AWG?: Aed
   KGS?: Aed
   NOK?: Aed
   UYU?: Aed
   KZT?: Aed
   BAM?: BAM
   BOB?: Aed
   XPF?: Aed
   TJS?: Aed
   HNL?: Aed
   MVR?: Aed
   RSD?: Aed
   ANG?: Aed
   KYD?: Aed
   TZS?: Aed
   GHS?: Aed
   GBP?: Aed
   IMP?: Aed
   IRR?: Aed
   NAD?: Aed
   ZAR?: Aed
   BSD?: Aed
   HUF?: Aed
   MDL?: Aed
   CZK?: Aed
   EGP?: Aed
   ILS?: Aed
   JOD?: Aed
   GNF?: Aed
   TTD?: Aed
   TWD?: Aed
   KES?: Aed
   NZD?: Aed
   SSP?: Aed
   JEP?: Aed
   TVD?: Aed
   KHR?: Aed
   CUC?: Aed
   CUP?: Aed
   PYG?: Aed
   MXN?: Aed
   TRY?: Aed
   BZD?: Aed
   BBD?: Aed
   FKP?: Aed
   SGD?: Aed
   LKR?: Aed
   QAR?: Aed
   CNY?: Aed
   PEN?: Aed
   GGP?: Aed
   BHD?: Aed
   ZMW?: Aed
   CLP?: Aed
   RON?: Aed
   MOP?: Aed
   DKK?: Aed
   FOK?: Aed
   BIF?: Aed
   SHP?: Aed
   FJD?: Aed
   GYD?: Aed
   ETB?: Aed
   SLL?: Aed
   PHP?: Aed
   MZN?: Aed
   ERN?: Aed
   VUV?: Aed
   SBD?: Aed
   ALL?: Aed
   CHF?: Aed
   RUB?: Aed
   CAD?: Aed
   GEL?: Aed
   BDT?: Aed
   DOP?: Aed
   KRW?: Aed
   HKD?: Aed
   UGX?: Aed
   KID?: Aed
   GMD?: Aed
   JPY?: Aed
   CKD?: Aed
   BTN?: Aed
   CVE?: Aed
   BWP?: Aed
   GIP?: Aed
   SZL?: Aed
   UAH?: Aed
   SEK?: Aed
   PAB?: Aed
   BMD?: Aed
   ISK?: Aed
   VES?: Aed
   AFN?: Aed
   BND?: Aed
   CDF?: Aed
   KPW?: Aed
   OMR?: Aed
   AED?: Aed
   VND?: Aed
   GTQ?: Aed
   IDR?: Aed
   ARS?: Aed
   COP?: Aed
   MKD?: Aed
   DJF?: Aed
   AMD?: Aed
   LSL?: Aed
   TND?: Aed
   STN?: Aed
   SAR?: Aed
   PLN?: Aed
   HTG?: Aed
   SYP?: Aed
   PKR?: Aed
   SCR?: Aed
   SDG?: BAM
   MWK?: Aed
   LRD?: Aed
   MYR?: Aed
   UZS?: Aed
   MMK?: Aed
   SOS?: Aed
   KMF?: Aed
   YER?: Aed
   MUR?: Aed
}

export interface Aed {
   name: string
   symbol: string
}

export interface BAM {
   name: string
}

export interface Demonyms {
   eng: Eng
   fra?: Eng
}

export interface Eng {
   f: string
   m: string
}

export interface Flags {
   png: string
   svg: string
   alt?: string
}

export interface Idd {
   root?: string
   suffixes?: string[]
}

export interface Maps {
   googleMaps: string
   openStreetMaps: string
}

export interface Name {
   common: string
   official: string
   nativeName?: { [key: string]: Translation }
}

export interface Translation {
   official: string
   common: string
}

export interface PostalCode {
   format: string
   regex?: string
}

export enum Region {
   Africa = 'Africa',
   Americas = 'Americas',
   Antarctic = 'Antarctic',
   Asia = 'Asia',
   Europe = 'Europe',
   Oceania = 'Oceania',
}

export enum StartOfWeek {
   Monday = 'monday',
   Saturday = 'saturday',
   Sunday = 'sunday',
}

export enum Status {
   OfficiallyAssigned = 'officially-assigned',
   UserAssigned = 'user-assigned',
}
