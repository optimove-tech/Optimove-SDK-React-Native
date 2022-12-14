export interface DeepLinkContent {
    title: string | null;
    description: string | null;
}

export interface DeepLink {
    resolution: DeepLinkResolution;
    url: string;
    content: DeepLinkContent | null;
    linkData: Record<string, any> | null;
}

export enum DeepLinkResolution {
    LOOKUP_FAILED = 'LOOKUP_FAILED',
    LINK_NOT_FOUND = 'LINK_NOT_FOUND',
    LINK_EXPIRED = 'LINK_EXPIRED',
    LINK_LIMIT_EXCEEDED = 'LINK_LIMIT_EXCEEDED',
    LINK_MATCHED = 'LINK_MATCHED'
}
