import type { PushNotification } from './push';
import type { DeepLink } from './ddl';
import type { InAppButtonPress } from './inApp';

export interface PushNotificationHandler {
  (notification: PushNotification): void;
}

export interface InAppDeepLinkHandler {
  (data: InAppButtonPress): void;
}

export interface InAppInboxUpdatedHandler {
  (): void;
}

export interface DeepLinkHandler {
  (deepLink: DeepLink): void;
}
