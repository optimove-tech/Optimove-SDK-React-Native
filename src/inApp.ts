export interface InAppInboxItem {
  id: number;
  title: string;
  subtitle: string;
  availableFrom: string | null;
  availableTo: string | null;
  dismissedAt: string | null;
  sentAt: string;
  data: Record<string, any> | null;
  isRead: boolean;
  imageUrl: string | null;
}

export interface InAppInboxSummary {
  totalCount: number;
  unreadCount: number;
}

export interface InAppButtonPress {
  deepLinkData: Record<string, any>;
  messageId: number;
  messageData: Record<string, any> | null;
}

export enum OptimoveInAppPresentationResult {
  Presented = 0,
  Expired = 1,
  Failed = 2,
  Paused = 3
}
