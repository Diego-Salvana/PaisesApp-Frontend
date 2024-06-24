import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { debounceTime } from 'rxjs'

@Component({
   selector: 'app-input-filter',
   templateUrl: './input-filter.component.html',
   styleUrls: ['./input-filter.component.css']
})
export class InputFilterComponent implements OnInit {
   @Output() onInput = new EventEmitter<string>()
   inputControl = new FormControl('')

   ngOnInit (): void {
      this.inputControl.valueChanges
         .pipe(debounceTime(200))
         .subscribe((value) => this.onInput.emit(value?.trim() ?? ''))
   }
}
