import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { MatOption } from '@angular/material/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatFormFieldAppearance } from '@angular/material/form-field'
import { debounceTime, map, tap } from 'rxjs/operators'

import { CountriesService } from '../../services/countries.service'

@Component({
   selector: 'app-input-search',
   templateUrl: './input-search.component.html',
   styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
   @Input() appearanceInput: MatFormFieldAppearance = 'outline'
   @Input() labelInput: string = ''
   @Input() placeHolderInput: string = ''
   @Input() region: string = ''
   @Input() searchBy: 'country' | 'capital' = 'country'
   @Input() sessionValue: string = ''
   suggestions: any[] = []
   nameInput = new FormControl('')
   isSend: boolean = false
   @Output() onSubmit = new EventEmitter<string>()

   constructor (
      private countriesSvc: CountriesService,
      private router: Router,
      private matSnackBar: MatSnackBar
   ) {}

   ngOnInit (): void {
      this.nameInput.setValue(this.sessionValue)

      this.nameInput.valueChanges
         .pipe(
            debounceTime(500),
            tap(() => this.matSnackBar.dismiss())
         )
         .subscribe({
            next: (value) => this.searchSuggestions(value),
            error: (err) => this.subsError(err)
         })
   }

   onOptionSelected (matOption: MatOption): void {
      if (matOption.id === 'search-term') this.submitInput()
      else void this.router.navigate(['/search', 'country', matOption.value])
   }

   searchSuggestions (value: string | null): void {
      const text = value?.trim()
      if (!text || this.isSend) {
         this.suggestions = []
         return
      }

      this.searchBy === 'capital' ? this.searchByCapital(text) : this.searchByName(text)
   }

   searchByName (value: string): void {
      this.countriesSvc
         .getByName(value)
         .pipe(
            map((countries) =>
               countries.filter((country) => {
                  const countryRegion = country.continent.toLowerCase()
                  return countryRegion === (this.region || countryRegion)
               })
            )
         )
         .subscribe({
            next: (countries) => (this.suggestions = countries.splice(0, 5)),
            error: (err) => this.subsError(err)
         })
   }

   searchByCapital (value: string): void {
      this.countriesSvc.getByCapital(value).subscribe({
         next: (countries) => (this.suggestions = countries.splice(0, 5)),
         error: (err) => this.subsError(err)
      })
   }

   subsError (err: any): void {
      this.suggestions = []
      console.error(err)
   }

   submitInput (): void {
      const text = this.nameInput.value?.trim()
      if (!text) return

      this.isSend = true
      this.suggestions = []
      this.onSubmit.emit(text)
   }
}
