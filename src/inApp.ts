export interface InAppInboxItem {
  id: number;
  title: string;
  subtitle: string;
  availableFrom: Date | null;
  availableTo: Date | null;
  dismissedAt: Date | null;
  sentAt: Date;
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
}
