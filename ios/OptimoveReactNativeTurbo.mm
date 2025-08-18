#import <React/RCTBridge+Private.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTUtils.h>
#import <ReactCommon/RCTTurboModule.h>

// Import the generated codegen header for this module (RN 0.76+)
#if __has_include(<OptimoveReactNativeSpec/OptimoveReactNativeSpec.h>)
#import <OptimoveReactNativeSpec/OptimoveReactNativeSpec.h>
#elif __has_include("OptimoveReactNativeSpec.h")
#import "OptimoveReactNativeSpec.h"
#elif __has_include("OptimoveReactNative/OptimoveReactNative.h")
#import "OptimoveReactNative/OptimoveReactNative.h"
#endif

@interface OptimoveReactNative : RCTEventEmitter <NativeOptimoveReactNativeSpec>
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params;
@end

// Import the Swift generated header if available
#if __has_include(<optimove_react_native/optimove_react_native-Swift.h>)
#import <optimove_react_native/optimove_react_native-Swift.h>
#elif __has_include(<optimove-react-native/optimove_react_native-Swift.h>)
#import <optimove-react-native/optimove_react_native-Swift.h>
#elif __has_include(<OptimoveReactNative/OptimoveReactNative-Swift.h>)
#import <OptimoveReactNative/OptimoveReactNative-Swift.h>
#elif __has_include("optimove_react_native-Swift.h")
#import "optimove_react_native-Swift.h"
#elif __has_include("OptimoveReactNative-Swift.h")
#import "OptimoveReactNative-Swift.h"
#endif

@implementation OptimoveReactNative (TurboModule)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeOptimoveReactNativeSpecJSI>(params);
}

@end
