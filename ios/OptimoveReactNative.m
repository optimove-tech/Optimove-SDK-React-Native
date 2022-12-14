#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "OptimoveReactNative-Swift.h"

@interface RCT_EXTERN_MODULE(OptimoveReactNative, RCTEventEmitter)

RCT_EXTERN_METHOD(initialize)

RCT_EXTERN_METHOD(getVisitorId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setUserId: (NSString*)userId)

RCT_EXTERN_METHOD(setUserEmail: (NSString*)email)

RCT_EXTERN_METHOD(registerUser: (NSString *)userId email:(NSString *)email)

RCT_EXTERN_METHOD(signOutUser)

RCT_EXTERN_METHOD(pushRequestDeviceToken)

RCT_EXTERN_METHOD(pushUnregister)

RCT_EXTERN_METHOD(reportEvent: (NSString*)event parameters:(NSDictionary*)parameters)

RCT_EXTERN_METHOD(reportScreenVisit: (NSString*) screenName screenCategory:(NSString*)screenCategory)

RCT_EXTERN_METHOD(inAppDeleteMessageWithIdFromInbox: (NSInteger*) itemId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inAppPresentItemWithId: (NSInteger*) itemId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inAppMarkAsReadItemWithId: (NSInteger*) itemId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inAppGetInboxItems:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inAppUpdateConsent: (BOOL)consentGiven)

RCT_EXTERN_METHOD(inAppMarkAllInboxItemsAsRead:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(inAppGetInboxSummary:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)


+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
