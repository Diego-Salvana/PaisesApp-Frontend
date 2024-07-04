import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { MatFormFieldAppearance } from '@angular/material/form-field'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { debounceTime, filter, finalize, map, tap } from 'rxjs/operators'

import { CountriesService } from '../../services/countries.service'
import { CountryCard } from 'src/app/interfaces/Country.interface'

@Component({
   selector: 'app-input-search',
   templateUrl: './input-search.component.html',
   styleUrls: ['./input-search.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSearchComponent implements OnInit {
   @Input() inputAppearance: MatFormFieldAppearance = 'outline'
   @Input() inputLabel: string = ''
   @Input() inputPlaceHolder: string = ''
   @Input() region: string | null = null
   @Input() searchBy: 'country' | 'capital' = 'country'
   @Input() sessionValue: string | null = null
   @Output() onSubmit = new EventEmitter<string>()
   private prevInputValue: string | null = null
   nameInput = new FormControl('')
   suggestions: CountryCard[] = []
   isSend: boolean = false

   constructor (
      private countriesService: CountriesService,
      private router: Router,
      private changeDetectorRef: ChangeDetectorRef
   ) {}

   ngOnInit (): void {
      this.nameInput.valueChanges
         .pipe(
            debounceTime(500),
            filter(value => value !== this.prevInputValue),
            tap(value => (this.prevInputValue = value))
         )
         .subscribe({
            next: (value) => this.searchSuggestions(value),
            error: () => this.resetSuggestions()
         })

      this.nameInput.setValue(this.sessionValue)
   }

   onOptionSelected (event: MatAutocompleteSelectedEvent): void {
      const matOption = event.option

      if (matOption.id === 'search-term') this.submitInput()
      else void this.router.navigate(['/search', 'country', matOption.value])
   }

   submitInput (): void {
      this.isSend = true
      this.onSubmit.emit(this.nameInput.value?.trim())
   }

   searchSuggestions (value: string | null): void {
      if (value === null || value.trim().length < 1) {
         this.suggestions = []
         this.changeDetectorRef.detectChanges()
         return
      }
      
      this.searchBy === 'capital' ? this.searchByCapital(value) : this.searchByName(value)
   }

   private searchByName (value: string): void {
      this.countriesService.getByName(value)
         .pipe(
            map(countries => countries.filter(country => {
               const countryContinent = country.continent.toLowerCase()
                  
               return countryContinent === (this.region ?? countryContinent)
            })),
            finalize(() => this.changeDetectorRef.detectChanges())
         )
         .subscribe({
            next: (countries) => (this.suggestions = countries.splice(0, 5)),
            error: () => this.resetSuggestions()
         })
   }

   private searchByCapital (value: string): void {
      this.countriesService.getByCapital(value)
         .pipe(
            finalize(() => this.changeDetectorRef.detectChanges())
         )
         .subscribe({
            next: (countries) => (this.suggestions = countries.splice(0, 5)),
            error: () => this.resetSuggestions()
         })
   }

   private resetSuggestions (): void {
      this.suggestions = []
   }
}
