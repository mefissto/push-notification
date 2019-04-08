import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { PushNotification } from './models/push.model';
import {
  PushPermission,
  PushNotificationConfig,
} from './models/push-config.model';

@Injectable({ providedIn: 'root' })
export class PushNotificationsService {
  private host = 'http://localhost:8888/';
  // public permission: PushPermission;

  constructor(private http: HttpClient, private swPush: SwPush) {
    // this.permission = this.isSupported() ? 'default' : 'denied';
  }

  public getPublicKey(): Observable<{ publicKey: string }> {
    return this.http.get<{ publicKey: string }>(
      `${this.host}api/push/publickey`,
    );
  }

  public saveSubscription(
    subscription: PushSubscription,
  ): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.host}api/push/subscribe`, subscription)
      .pipe(
        map((res) => res),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        }),
      );
  }

  public isSupported(): boolean {
    return this.swPush.isEnabled;
  }

  public async requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      this.checkSubscription();
    }
  }

  private checkSubscription() {
    this.swPush.subscription.subscribe((currSub) => {
      if (!currSub) {
        this.getPublicKey().subscribe(({ publicKey }) => {
          this.subscribeToPush(publicKey);
        });
      }
    });
  }

  private subscribeToPush(publicKey: string) {
    // Requesting messaging service to subscribe current client (browser)
    this.swPush
      .requestSubscription({
        serverPublicKey: publicKey,
      })
      .then((pushSubscription) => {
        this.saveSubscription(pushSubscription).subscribe();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
