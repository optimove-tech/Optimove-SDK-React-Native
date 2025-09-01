# Changelog

## 3.0.0

- [Breaking]
  - Requires React Native ≥ 0.76 and New Architecture enabled.
  - iOS: AppDelegate import changed.
    - Old: `#import <OptimoveReactNative/OptimovReactNative-Bridging.h>`
    - New: `#import <OptimoveReactNative/OptimoveInitializer.h>`
- Android: updated Optimove Android SDK to `7.7.0`.
  - Fix duplicated events sent when multiple immediate events reported
- iOS: updated Optimove iOS SDK to `~> 6.2.3`:
  - Add Privacy Manifest
  - Add support for coexistence with other SDKs that swizzle push related app delegate methods
  - Fix invalidating sessions on NetworkClientImpl deinit
  - Fix same immediate events sent multiple times
  - Fix in app presentation issue in orientation change
  - Fix Xcode 16 OptimoveSDK warnings
  - Fix deeplink decoding issue
  - Remove SetUserAgent event
- In-app: `Optimove.inAppPresentInboxMessage` can now return `Paused`.
- DX: common types are now exported from the package root for simpler imports (e.g., `import { OptimoveInAppPresentationResult } from '@optimove-inc/react-native'`).

Internal: migrated to Yarn 3, ESLint 9, turbo; updated example app to RN `0.76.9`.

## 2.1.0

- Updated the iOS SDK to version `~> 6.2.3`:
  - Add Privacy Manifest
  - Add support for coexistence with other SDKs that swizzle push related app delegate methods
  - Fix invalidating sessions on NetworkClientImpl deinit
  - Fix same immediate events sent multiple times
  - Fix in app presentation issue in orientation change
  - Fix Xcode 16 OptimoveSDK warnings
  - Fix deeplink decoding issue
  - Remove SetUserAgent event

## 2.0.3

- Updated the DDL types to export the `MatchedResolution` and `NonMatchedResolution` types

## 2.0.2

- Fixed the parsing of all in app related data passed from Android to React Native
- Fixed the push events data and push opened event actionId to set null explicitly when passed from Android to React Native

## 2.0.1

Fixed the parsing of the push data passed from Android to React Native

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
