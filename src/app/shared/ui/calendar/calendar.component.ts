import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventPopupComponent } from '../event-popup/event-popup.component';
import { EventsService } from '../../services';
import html2canvas from 'html2canvas';
import { BgSelectorComponent } from '../bg-selector/bg-selector.component';

@Component({
  selector: 'app-calendar',
  // standalone: true,
  // imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  currentDate!: Date;
  selectedDate!: Date;
  currentMonth!: number;
  currentYear!: number;
  selectedYear!: number;
  selectedMonth!: number;
  months: number[] = Array.from({ length: 12 }).map((_, i) => i);
  years: number[] = Array.from({ length: 10 }).map(
    (_, i) => new Date().getFullYear() - 5 + i
  );

  @Output() updateEvent = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private cacheEventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.selectedYear = this.currentYear;
    this.selectedMonth = this.currentMonth;
  }

  goToPreviousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.updateEvent.emit({ month: this.currentMonth, year: this.currentYear });
  }

  goToNextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.updateEvent.emit({ month: this.currentMonth, year: this.currentYear });
  }

  onSelectDate(date: Date): void {
    this.selectedDate = date;
    if (date) {
      this.openEventPopup();
    }
  }

  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  generateCalendar(): Date[][] {
    const firstDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    const totalDays = this.getDaysInMonth(this.currentMonth, this.currentYear);
    const weeks: (any | Date)[][] = [[]];
    let currentWeek = 0;

    for (let i = 0; i < firstDayOfMonth; i++) {
      weeks[currentWeek].push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      if (weeks[currentWeek].length === 7) {
        currentWeek++;
        weeks[currentWeek] = [];
      }
      weeks[currentWeek].push(
        new Date(this.currentYear, this.currentMonth, day)
      );
    }

    return weeks;
  }

  openEventPopup(): void {
    let currDate = this.selectedDate.toDateString();
    const dialogRef = this.dialog.open(EventPopupComponent, {
      width: '500px', // Set the width of the pop-up window as needed
      position: {
        top: '50vh',
        left: '50vh',
      },
      data: { date: currDate, events: this.cacheEventsService.get(currDate) },
    });

    dialogRef.componentInstance.eventAdded.subscribe((result) => {
      if (result != null) {
        this.cacheEventsService.update(result);
      }
      this.updateEvent.emit({
        month: this.currentMonth,
        year: this.currentYear,
      });
    });
  }

  openBgSelector() {
    const dialogRef = this.dialog.open(BgSelectorComponent, {
      width: '500px', // Set the width of the pop-up window as needed
      position: {
        top: '50vh',
        left: '50vh',
      },
    });
  }

  onSelectYear(year: number): void {
    this.selectedYear = year;
  }

  onSelectMonth(month: number): void {
    this.selectedMonth = month;
  }

  getBackgroundColor(date: Date) {
    if (date == null) {
      return 'bg-white-200';
    }
    switch (this.cacheEventsService.getDateType(date.toDateString())) {
      case 'empty':
        return 'bg-white-200';
      case 'events':
        return 'bg-blue-200';
      case 'holiday':
        return 'bg-red-200';
      default:
        return 'bg-white-200';
    }
  }

  download() {
    var myDivToConvert = document.getElementById('myCalendar');
    html2canvas(myDivToConvert as HTMLElement).then((canvas) => {
      let dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const byteString = atob(dataUrl.split(',')[1]);
      const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // Trigger download
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(blob);
      anchor.download = 'calendar-event.png'; // You can specify the file name here
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });
  }
}
