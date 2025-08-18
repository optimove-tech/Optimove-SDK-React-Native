import type {
  DeepLinkHandler,
  InAppDeepLinkHandler,
  InAppInboxUpdatedHandler,
  PushNotificationHandler,
} from './handlers';
import type { EmitterSubscription, NativeModule } from 'react-native';
import type {
  InAppInboxItem,
  InAppInboxSummary,
  OptimoveInAppPresentationResult,
} from './inApp';

import {
  NativeEventEmitter
} from 'react-native';
import OptimoveReactNative from './NativeOptimoveReactNative';

const optimoveEmitter = new NativeEventEmitter(OptimoveReactNative as unknown as NativeModule);

export default class Optimove {
  private static pushReceivedHandler: PushNotificationHandler;
  private static pushOpenedHandler: PushNotificationHandler;
  private static inAppDeepLinkHandler?: InAppDeepLinkHandler;
  private static inAppInboxUpdatedHandler: InAppInboxUpdatedHandler;
  private static deepLinkHandler: DeepLinkHandler;

  private static pushOpenedSubscription: EmitterSubscription;
  private static pushReceivedSubscription: EmitterSubscription;
  private static inAppDeepLinkSubscription: EmitterSubscription;
  private static inAppInboxUpdatedSubscription: EmitterSubscription;
  private static deepLinkSubscription: EmitterSubscription;

  static setUserId(userId: string) {
    OptimoveReactNative.setUserId(userId);
  }

  static setUserEmail(email: string): void {
    OptimoveReactNative.setUserEmail(email);
  }

  static registerUser(userId: string, email: string): void {
    OptimoveReactNative.registerUser(userId, email);
  }

  static signOutUser(): void {
    OptimoveReactNative.signOutUser();
  }

  static pushRequestDeviceToken(): void {
    OptimoveReactNative.pushRequestDeviceToken();
  }

  static pushUnregister(): void {
    OptimoveReactNative.pushUnregister();
  }

  static getVisitorId(): Promise<string> {
    return OptimoveReactNative.getVisitorId();
  }

  static reportEvent(event: string, parameters?: Record<string, any>) {
    return OptimoveReactNative.reportEvent(event, parameters);
  }

  static reportScreenVisit(screenName: string, screenCategory?: string) {
    return OptimoveReactNative.reportScreenVisit(screenName, screenCategory);
  }

  static inAppDeleteMessageFromInbox(item: InAppInboxItem): Promise<boolean> {
    return OptimoveReactNative.inAppDeleteMessageWithIdFromInbox(item.id);
  }

  static inAppPresentInboxMessage(
    item: InAppInboxItem
  ): Promise<OptimoveInAppPresentationResult> {
    return OptimoveReactNative.inAppPresentItemWithId(item.id);
  }

  static inAppMarkAsRead(item: InAppInboxItem): Promise<boolean> {
    return OptimoveReactNative.inAppMarkAsReadItemWithId(item.id);
  }

  static inAppGetInboxItems(): Promise<InAppInboxItem[]> {
    return OptimoveReactNative.inAppGetInboxItems();
  }

  static inAppUpdateConsent(consentGiven: boolean) {
    OptimoveReactNative.inAppUpdateConsent(consentGiven);
  }

  static inAppMarkAllInboxItemsAsRead(): Promise<boolean> {
    return OptimoveReactNative.inAppMarkAllInboxItemsAsRead();
  }

  static inAppGetInboxSummary(): Promise<InAppInboxSummary> {
    return OptimoveReactNative.inAppGetInboxSummary();
  }

  static setPushReceivedHandler(pushReceivedHandler: PushNotificationHandler) {
    Optimove.pushReceivedHandler = pushReceivedHandler;
    this.initPushReceivedSubscriptionIfNeeded();
  }

  static initPushReceivedSubscriptionIfNeeded() {
    if (Optimove.pushReceivedSubscription != null) {
      return;
    }

    Optimove.pushReceivedSubscription = optimoveEmitter.addListener(
      EventType.PushReceived,
      (notification) => Optimove.pushReceivedHandler?.(notification)
    );
  }

  static setPushOpenedHandler(pushOpenedHandler: PushNotificationHandler) {
    Optimove.pushOpenedHandler = pushOpenedHandler;
    this.initPushOpenedSubscriptionIfNeeded();
  }

  static initPushOpenedSubscriptionIfNeeded() {
    if (Optimove.pushOpenedSubscription != null) {
      return;
    }

    Optimove.pushOpenedSubscription = optimoveEmitter.addListener(
      EventType.PushOpened,
      (notification) => Optimove.pushOpenedHandler?.(notification)
    );
  }

  static setDeepLinkHandler(deepLinkHandler: DeepLinkHandler) {
    Optimove.deepLinkHandler = deepLinkHandler;
    this.initDeepLinkSubscriptionIfNeeded();
  }

  static initDeepLinkSubscriptionIfNeeded() {
    if (Optimove.deepLinkSubscription != null) {
      return;
    }

    Optimove.deepLinkSubscription = optimoveEmitter.addListener(
      EventType.DDL,
      (deeplink) => Optimove.deepLinkHandler?.(deeplink)
    );
  }

  static setOnInboxUpdateHandler(
    inAppInboxUpdatedHandler: InAppInboxUpdatedHandler
  ) {
    Optimove.inAppInboxUpdatedHandler = inAppInboxUpdatedHandler;
    this.initOnInboxUpdateSubscriptionIfNeeded();
  }

  static initOnInboxUpdateSubscriptionIfNeeded() {
    if (Optimove.inAppInboxUpdatedSubscription != null) {
      return;
    }

    Optimove.inAppInboxUpdatedSubscription = optimoveEmitter.addListener(
      EventType.InAppInboxUpdated,
      () => Optimove.inAppInboxUpdatedHandler?.()
    );
  }

  static setInAppDeeplinkHandler(inAppDeeplinkHandler: InAppDeepLinkHandler) {
    Optimove.inAppDeepLinkHandler = inAppDeeplinkHandler;
    this.initInAppDeeplinkSubscriptionIfNeeded();
  }

  static initInAppDeeplinkSubscriptionIfNeeded() {
    if (Optimove.inAppDeepLinkSubscription != null) {
      return;
    }

    Optimove.inAppDeepLinkSubscription = optimoveEmitter.addListener(
      EventType.InAppDeeplinkPressed,
      (inAppButtonPress) => Optimove.inAppDeepLinkHandler?.(inAppButtonPress)
    );
  }
}

enum EventType {
  InAppDeeplinkPressed = 'in-app.deepLinkPressed',
  InAppInboxUpdated = 'inbox.updated',
  DDL = 'deep-linking.linkResolved',
  PushReceived = 'push.received',
  PushOpened = 'push.opened',
}
