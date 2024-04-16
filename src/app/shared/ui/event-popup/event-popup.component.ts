import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from '../../models';

@Component({
  selector: 'app-event-popup',
  // standalone: true,
  // imports: [],
  templateUrl: './event-popup.component.html',
  styleUrl: './event-popup.component.scss'
})

export class EventPopupComponent {
  @Output() eventAdded = new EventEmitter<CalendarEvent>();

  title: string = '';
  description: string = '';
  image: File | null = null;
  fee: number = 0;
  isHoliday: boolean = false;
  selectedEvent: any;

  constructor(public dialogRef: MatDialogRef<EventPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    console.log(this.data);
  }

  onSubmit(): void {
    const event = {
      id: this.selectedEvent.id,
      date: this.data.date,
      title: this.title,
      description: this.description,
      image: this.image,
      fee: this.fee,
      isHoliday: this.isHoliday
    };
    this.eventAdded.emit(event);
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    this.image = event.target.files[0];
  }

  selectEvent(event: any): void {
    this.selectedEvent = event;
    // Populate the form fields with the selected event details for revision
    this.title = event.title;
    this.description = event.description;
    this.fee = event.fee;
    this.isHoliday = event.isHoliday;
  }

  newEvent() {
    this.selectedEvent = new CalendarEvent();
    console.log(this.selectedEvent);
  }

  goBackToList() {
    this.selectedEvent = null;
    this.title = '';
    this.description = '';
    this.fee = 0;
    this.isHoliday = false;
  }
}
