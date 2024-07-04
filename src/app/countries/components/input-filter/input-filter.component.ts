import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { debounceTime, map } from 'rxjs'

@Component({
   selector: 'app-input-filter',
   templateUrl: './input-filter.component.html',
   styleUrls: ['./input-filter.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFilterComponent implements OnInit {
   @Output() onInput = new EventEmitter<string>()
   inputControl = new FormControl('')

   ngOnInit (): void {
      this.inputControl.valueChanges
         .pipe(
            debounceTime(200),
            map(value => value !== null ? value : '')
         )
         .subscribe(value => this.onInput.emit(value))
   }
}
