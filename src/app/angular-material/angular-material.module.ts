import { NgModule } from '@angular/core'

import { LayoutModule } from '@angular/cdk/layout'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRippleModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'

@NgModule({
   exports: [
      LayoutModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatCardModule,
      MatChipsModule,
      MatDividerModule,
      MatFormFieldModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSnackBarModule,
      MatTableModule,
      MatToolbarModule,
      MatTooltipModule
   ]
})
export class AngularMaterialModule {}
