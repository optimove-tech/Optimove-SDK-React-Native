import type {
  InAppInboxItem,
  InAppInboxSummary,
  OptimoveInAppPresentationResult
} from './inApp';

import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  setUserId(userId: string): void;
  setUserEmail(email: string): void;
  registerUser(userId: string, email: string): void;
  signOutUser(): void;
  pushRequestDeviceToken(): void;
  pushUnregister(): void;
  getVisitorId(): Promise<string>;
  reportEvent(event: string, parameters?: Object): void;
  reportScreenVisit(screenName: string, screenCategory?: string): void;
  inAppDeleteMessageWithIdFromInbox(id: number): Promise<boolean>;
  inAppPresentItemWithId(id: number): Promise<OptimoveInAppPresentationResult>;
  inAppMarkAsReadItemWithId(id: number): Promise<boolean>;
  inAppGetInboxItems(): Promise<InAppInboxItem[]>;
  inAppUpdateConsent(consentGiven: boolean): void;
  inAppMarkAllInboxItemsAsRead(): Promise<boolean>;
  inAppGetInboxSummary(): Promise<InAppInboxSummary>;

  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('OptimoveReactNative');
