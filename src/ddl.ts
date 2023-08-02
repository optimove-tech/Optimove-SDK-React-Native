export interface DeepLinkContent {
  title: string | null;
  description: string | null;
}

interface NonMatchedResolution {
  resolution: Exclude<DeepLinkResolution, DeepLinkResolution.LINK_MATCHED>;
  url: string;
}

interface MatchedResolution {
  resolution: DeepLinkResolution.LINK_MATCHED;
  url: string;
  content: DeepLinkContent;
  linkData: Record<string,any>;
}

export type DeepLink = NonMatchedResolution | MatchedResolution;

export enum DeepLinkResolution {
  LOOKUP_FAILED = 'LOOKUP_FAILED',
  LINK_NOT_FOUND = 'LINK_NOT_FOUND',
  LINK_EXPIRED = 'LINK_EXPIRED',
  LINK_LIMIT_EXCEEDED = 'LINK_LIMIT_EXCEEDED',
  LINK_MATCHED = 'LINK_MATCHED',
}
