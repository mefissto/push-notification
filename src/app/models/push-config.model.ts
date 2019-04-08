export declare type PushPermission = 'denied' | 'granted' | 'default';

export interface PushNotificationConfig {
  body?: string;
  icon?: string;
  image?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}
