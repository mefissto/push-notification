(function() {
  'use strict';

  // const vapidKeys = {
  //   publicKey:
  //     'BEcouxuo2bTJr1RzWQkJ4dd20ARn_uQaCwAXXQAqyYTFhwINTN9Ohv9Ht4oTuWgKoftsrRbPGnrF9FY9TWg0rb4',
  //   privateKey: 'rLRCMcw1KuKHfvGNMVAm3bMeiTDEBAwVUh67oyvIoQI',
  // };

  // urlB64ToUint8Array will encode the base64 public key
  // to Array buffer which is needed by the subscription option
  // const urlB64ToUint8Array = (base64String) => {
  //   const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/\-/g, '+')
  //     .replace(/_/g, '/');
  //   const rawData = atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);
  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // };

  // const saveSubscription = (sub) => {
  //   fetch('http://localhost:8888/api/push/subscribe', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(sub),
  //   });
  // };

  // self.addEventListener('activate', async (data) => {
  //   // const permission = await Notification.requestPermission();
  //   // console.log('permission: ', permission);
  //   // console.log(Notification);
  //   // Notification.requestPermission.then((res) => console.log(res));

  //   // This will be called only once when the service worker is activated.
  //   console.log(self);
  //   registration.pushManager.getSubscription().then((res) => console.log(res));
  //   try {
  //     const options = {
  //       userVisibleOnly: true,
  //       applicationServerKey: urlB64ToUint8Array(vapidKeys.publicKey),
  //     };
  //     const subscription = await self.registration.pushManager
  //       .subscribe(options)
  //       .then((sub) => saveSubscription(sub));
  //     console.log(subscription);
  //   } catch (err) {
  //     console.log('Error', err);
  //   }
  // });

  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    console.log('notification details: ', event.notification);
    const url =
      'https://stage.portal.inveritasoft.com/portal/timelog/my-report';
    event.waitUntil(
      clients.matchAll().then(function(clis) {
        var client = clis.find(function(c) {
          c.visibilityState === 'visible';
        });
        if (client !== undefined) {
          client.navigate(url);
          client.focus();
        } else {
          // there are no visible windows. Open one.
          clients.openWindow(url);
          notification.close();
        }
      }),
    );
  });

  self.addEventListener('push', function(event) {
    console.log('event: ', event);
    let notificationData = {};

    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData = {
        title: 'An error on back-end side',
        body: 'Something went wrong!',
        icon: '/default-icon.png',
      };
    }

    event.waitUntil(
      self.registration.showNotification(notificationData.title, {
        body: notificationData.body,
        icon: notificationData.icon,
      }),
    );
  });
})();
