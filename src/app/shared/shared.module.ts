import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './ui';
import { EventPopupComponent } from './ui/event-popup/event-popup.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon'
import { EventsService } from './services';

@NgModule({
  declarations: [
    CalendarComponent,
    EventPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
  ],
  exports: [
    CalendarComponent,
    EventPopupComponent,
  ]
})
export class SharedModule { }
