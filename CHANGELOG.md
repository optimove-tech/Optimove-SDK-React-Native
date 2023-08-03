# Changelog

## 2.0.0

- Support iOS projects with `use_frameworks!` enabled
- [Breaking] For push opens don't set launch intent flags. Instead rely on the default React Native `singleTask` launch mode.
- [Breaking] Changed the ```DeepLink``` object structure received from the DeepLinkHandler when calling ```Optimove.setDeepLinkHandler``` to:

```typescript
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
```

## 1.1.1

Fixed the ```Date``` types of ```InAppInboxItem``` to be ```string```

## 1.1.0

- Changed the iOS SDK version to 5.2.2
- Changed the Android SDK version to 7.1.1
- Added an API to configure the small notification icon on Android

## 1.0.0

React Native SDK release, use [the documentation](https://github.com/optimove-tech/Optimove-SDK-React-Native/blob/main/README.md) to implement
