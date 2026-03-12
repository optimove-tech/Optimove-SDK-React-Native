#import <React/RCTBridgeModule.h>

@interface SdkInfoModule : NSObject <RCTBridgeModule>
@end

@implementation SdkInfoModule

RCT_EXPORT_MODULE(SdkInfo);

- (NSDictionary *)constantsToExport {
  NSString *bundlePath = [[NSBundle mainBundle] pathForResource:@"OptimoveSDK" ofType:@"bundle"];
  NSBundle *sdkBundle = bundlePath ? [NSBundle bundleWithPath:bundlePath] : nil;
  NSString *version = [sdkBundle objectForInfoDictionaryKey:@"CFBundleShortVersionString"] ?: @"";
  return @{ @"iosSdkVersion": version };
}

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

@end
