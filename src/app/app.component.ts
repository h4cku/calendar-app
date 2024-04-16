import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { EventsService } from './shared/services';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  summary: any = '';
  title = 'calendar-app';

  constructor(private cacheEventsService: EventsService) {}

  update(event: any) {
    this.summary = this.cacheEventsService.summary(event.month, event.year);
  }
}
