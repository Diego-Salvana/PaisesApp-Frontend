export interface Country extends CountryCard {
   nativeName: string
   region: string
   area: number
   timezones: string | string[]
   landlocked: boolean
   map: string
   borders: string[]
}

export interface CountryCard {
   id?: number
   name: string
   nameSpa: string
   continent: string
   capital: string
   population: number
   code2: string
   code3: string
}

export interface Border {
   name: string
   nameSpa: string
   code2: string
   code3: string
}
