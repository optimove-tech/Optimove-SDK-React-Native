#ifndef OptimovReactNative_Bridging_h
#define OptimovReactNative_Bridging_h

@interface OptimoveInitializer

+ (void)initialize:(NSString *_Nonnull)optimoveCredentials optimobileCredentials:(NSString *_Nonnull)optimobileCredentials inAppConsentStrategy:(NSString *_Nonnull)inAppConsentStrategy enableDeferredDeepLinking:(BOOL)enableDeferredDeepLinking;

+ (BOOL)application:(UIApplication * _Nonnull)application userActivity:(NSUserActivity * _Nonnull)userActivity
 restorationHandler:(void (^_Nonnull)(NSArray<id<UIUserActivityRestoring>> * _Nonnull restorableObjects))restorationHandler;

+ (void)scene:(UIScene * _Nonnull)scene
      session:(UISceneSession * _Nonnull)session
      options:(UISceneConnectionOptions * _Nonnull)connectionOptions API_AVAILABLE(ios(13.0));

+ (void)scene:(UIScene * _Nonnull)scene
 userActivity:(NSUserActivity * _Nonnull)userActivity API_AVAILABLE(ios(13.0));

@end

#endif /* OptimovReactNative_Bridging_h */
