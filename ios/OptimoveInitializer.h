#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface OptimoveInitializer : NSObject

+ (void)initialize:(NSString *)optimoveCredentials
optimobileCredentials:(NSString *)optimobileCredentials
inAppConsentStrategy:(NSString *)inAppConsentStrategy
enableDeferredDeepLinking:(BOOL)enableDeferredDeepLinking;

+ (BOOL)application:(UIApplication *)application
    userActivity:(NSUserActivity *)userActivity
    restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler;

+ (void)scene:(UIScene *)scene
    session:(UISceneSession *)session
    options:(UISceneConnectionOptions *)options API_AVAILABLE(ios(13.0));

+ (void)scene:(UIScene *)scene
    userActivity:(NSUserActivity *)userActivity API_AVAILABLE(ios(13.0));

@end

NS_ASSUME_NONNULL_END
