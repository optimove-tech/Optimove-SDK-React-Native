#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <OptimoveReactNative/OptimoveInitializer.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  [OptimoveInitializer initialize:@"<YOUR OPTIMOVE CREDENTIALS>" optimobileCredentials:@"<YOUR OPTIMOBILE CREDENTIALS>" inAppConsentStrategy:@"auto-enroll|in-app-disabled|explicit-by-user" enableDeferredDeepLinking:true];

  self.moduleName = @"OptimoveReactNativeExample";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler {
    return [OptimoveInitializer application:application userActivity:userActivity restorationHandler:restorationHandler];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
