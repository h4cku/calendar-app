import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { EventsService } from './shared/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  summary: any = "";
  title = 'calendar-app';

  constructor(private cacheEventsService: EventsService) { }

  update(event: any) {
    console.log(event);
    this.summary = this.cacheEventsService.summary(event.month, event.year);
  }
}
