export interface EmbeddedMessage {
  id: string;
  containerId: string;
  templateId: number;
  title: string;
  content: string;
  media: string;
  url: string;
  payload: string;
  campaignKind: number;
  messageLayoutType: number;
  engagementId: string | null;
  customerId: string;
  isVisitor: boolean;
  createdAt: string;
  updatedAt: string;
  executionDateTime: string;
  readAt: string | null;
  expiryDate: string | null;
}

export interface Container {
  containerId: string;
  messages: EmbeddedMessage[];
}

export interface ContainerRequestOptions {
  containerId: string;
  limit: number;
}
