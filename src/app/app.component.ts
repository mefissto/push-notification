import { Component, OnInit } from '@angular/core';
import { PushNotificationsService } from './push.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = 'Browser Push Notifications!';

  constructor(private pushService: PushNotificationsService) {
    if (pushService.isSupported()) {
      pushService.requestNotificationPermission();
    }
  }
}
