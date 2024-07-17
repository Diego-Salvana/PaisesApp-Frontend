import { CountryCard } from 'src/app/interfaces/Country.interface'

export function showCountries (listRef: CountryCard[], quantity: number = 20): CountryCard[] {
   return listRef.splice(0, quantity > 20 ? quantity : 20)
}

export function addCards (countriesShown: CountryCard[], listRef: CountryCard[]): CountryCard[] | undefined {
   const html = document.documentElement
   const { scrollHeight, clientHeight, scrollTop } = html
   const bottomDistance = scrollHeight - (clientHeight + scrollTop)

   if (bottomDistance < 400 && listRef.length > 0) {
      return [...countriesShown, ...showCountries(listRef)]
   }

   return undefined
}
