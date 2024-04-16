import { Injectable } from '@angular/core';
import { CalendarEvent } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  cacheEvents: any;
  idx: number = 0;

  constructor() {
    this.cacheEvents = {};
    this.idx = 0;
  }

  update(e: CalendarEvent) {
    if (e.id == '') {
      e.id = '' + this.idx;
      this.idx += 1;
    }
    if (this.cacheEvents[e.date] == null) {
      this.cacheEvents[e.date] = [];
    }
    this.cacheEvents[e.date] = this.cacheEvents[e.date].filter(
      (e_: CalendarEvent) => e_.id != e.id
    );
    this.cacheEvents[e.date].push(e);
  }

  get(date: string): CalendarEvent[] {
    return this.cacheEvents[date];
  }

  delete(event: CalendarEvent): void {
    this.cacheEvents[event.date] = this.cacheEvents[event.date].filter(
      (e: CalendarEvent) => e.id != event.id
    );
  }

  getDateType(date: string): string {
    let events = this.cacheEvents[date];
    if (events == null || events.length == 0) {
      return 'empty';
    }
    let holidayEvents = events.filter((e: CalendarEvent) => e.isHoliday);
    if (holidayEvents.length > 0) {
      return 'holiday';
    }
    return 'events';
  }

  summary(month: number, year: number) {
    let s = '';
    let d = new Date();
    for (let i = 0; i <= 31; i++) {
      d.setFullYear(year, month, i);
      let events = this.cacheEvents[d.toDateString()];
      if (events != null && events.length > 0) {
        let holidayEvents = events.filter((e: CalendarEvent) => e.isHoliday);
        if (holidayEvents.length > 0) {
          s += events[0].date + '\n';
          s += '========================================\n';
          s += 'Holiday\n';
          s += '========================================\n';
        } else {
          s += events[0].date + '\n';
          s += '========================================\n';
          for (let j in events) {
            s += events[j].title + '\n';
            s += events[j].description + '\n';
            s += events[j].fee + '\n';
          }
          s += '========================================\n';
        }
      }
    }
    return s;
  }
}
