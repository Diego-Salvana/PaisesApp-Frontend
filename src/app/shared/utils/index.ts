export function capitalize (value: string): string {
   const lowerCaseValue = value.toLowerCase()
   const capitalizedValue = lowerCaseValue.charAt(0).toUpperCase() + lowerCaseValue.slice(1)

   return capitalizedValue
}

export function translateContinent (value: string): string {
   switch (value) {
      case 'africa':
         return 'África'
      case 'america':
      case 'americas':
         return 'América'
      case 'asia':
         return 'Asia'
      case 'europe':
         return 'Europa'
      case 'oceania':
         return 'Oceania'
      case 'antartica':
         return 'Antártida'
      default:
         return capitalize(value)
   }
}
