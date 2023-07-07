import { Pipe, PipeTransform } from '@angular/core';

type Region = 'africa' | 'americas' | 'asia' | 'europe' | 'oceania';

@Pipe({
   name: 'regionTraductor',
})
export class RegionTraductorPipe implements PipeTransform {
   transform(value: string): string {
      const region: Region = value.toLowerCase() as Region;

      switch (region) {
         case 'africa':
            return 'África';
         case 'americas':
            return 'América';
         case 'asia':
            return 'Asia';
         case 'europe':
            return 'Europa';
         case 'oceania':
            return 'Oceanía';
         default:
            return value;
      }
   }
}
