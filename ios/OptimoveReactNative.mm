#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

// Import the generated codegen header if available (TurboModule)
#if __has_include(<OptimoveReactNativeSpec/OptimoveReactNativeSpec.h>)
#import <OptimoveReactNativeSpec/OptimoveReactNativeSpec.h>
#elif __has_include("OptimoveReactNativeSpec.h")
#import "OptimoveReactNativeSpec.h"
#elif __has_include("OptimoveReactNative/OptimoveReactNative.h")
#import "OptimoveReactNative/OptimoveReactNative.h"
#endif

#if __has_include(<OptimoveReactNative/OptimoveReactNative-Swift.h>)
#import <OptimoveReactNative/OptimoveReactNative-Swift.h>
#elif __has_include("OptimoveReactNative-Swift.h")
#import "OptimoveReactNative-Swift.h"
#endif

@interface RCT_EXTERN_MODULE(OptimoveReactNative, RCTEventEmitter)

RCT_EXTERN_METHOD(initialize)

RCT_EXTERN_METHOD(getVisitorId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setUserId:(NSString*)userId)

RCT_EXTERN_METHOD(setUserEmail:(NSString*)email)

RCT_EXTERN_METHOD(registerUser:(NSString*)userId email:(NSString*)email)

RCT_EXTERN_METHOD(signOutUser)

RCT_EXTERN_METHOD(pushRequestDeviceToken)

RCT_EXTERN_METHOD(pushUnregister)

RCT_EXTERN_METHOD(reportEvent:(NSString*)event parameters:(NSDictionary * _Nullable)parameters)

RCT_EXTERN_METHOD(reportScreenVisit:(NSString*)screenName screenCategory:(NSString * _Nullable)screenCategory)

RCT_EXTERN_METHOD(inAppDeleteMessageWithIdFromInbox:(double)id resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inAppPresentItemWithId:(double)id resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inAppMarkAsReadItemWithId:(double)id resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inAppGetInboxItems:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inAppUpdateConsent:(BOOL)consentGiven)

RCT_EXTERN_METHOD(inAppMarkAllInboxItemsAsRead:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inAppGetInboxSummary:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(removeListeners:(double)count)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
