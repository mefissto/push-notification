export class PushNotification {
  title?: string;
  content?: string;
  icon?: string;
  image?: string;
  lang?: string;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
