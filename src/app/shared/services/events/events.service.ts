import { Injectable } from '@angular/core';
import { CalendarEvent } from '../../models';

@Injectable({
  providedIn: 'root'
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
      this.idx += 1
    }
    if (this.cacheEvents[e.date] == null) {
      this.cacheEvents[e.date] = []
    }
    this.cacheEvents[e.date] = this.cacheEvents[e.date].filter((e_: CalendarEvent) => e_.id != e.id);
    this.cacheEvents[e.date].push(e);
  }

  get(date: string): CalendarEvent {
    return this.cacheEvents[date];
  }

  summary(month: number, year: number) {
    let s = ""
    let d = new Date();
    for (let i = 0; i <= 31; i++) {
      d.setFullYear(year, month, i);
      let events = this.cacheEvents[d.toDateString()]
      if (events != null) {
        s += events[0].date + "\n";
        s += "========================================\n"
        for (let j in events) {
          s += events[j].title + "\n"
          s += events[j].description + "\n"
          s += events[j].fee + "\n"
        }
        s += "========================================\n"
      }
    }
    return s;
  }
}
