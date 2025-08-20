import Foundation
import OptimoveSDK

@objc(OptimoveInitializer)
public class OptimoveInitializer: NSObject {

    private static let sdkVersion = "3.0.0"
    private static let sdkType = 9
    private static let runtimeType = 7
    private static let runtimeVersion = "Unknown";

    @objc
    public static func initialize(_ optimoveCredentials: String, optimobileCredentials: String, inAppConsentStrategy: String, enableDeferredDeepLinking: Bool) {
        //crash immediately if string is not one of the enums
        let inAppConsentStrategyEnum: InAppConsentStrategy = InAppConsentStrategy(rawValue: inAppConsentStrategy)!

        let config = OptimoveConfigBuilder(optimoveCredentials: optimoveCredentials, optimobileCredentials: optimobileCredentials)

        if (enableDeferredDeepLinking) {
            config.enableDeepLinking({ deepLinkResolution in
                OptimoveReactNativeEmitter.shared.emit(event: DeeplinkResolvedEvent(deepLinkResolution: deepLinkResolution))
            })
        }

        if #available(iOS 10, *) {
            config.setPushReceivedInForegroundHandler(pushReceivedInForegroundHandlerBlock: { notification , completionHandler in
                OptimoveReactNativeEmitter.shared.emit(event: PushReceived(pushNotification: notification))
                completionHandler(UNNotificationPresentationOptions.alert)
            })
        }

        config.setPushOpenedHandler(pushOpenedHandlerBlock: { notification in
            OptimoveReactNativeEmitter.shared.emit(event: PushOpenedEvent(pushNotification: notification))
        })

        if inAppConsentStrategyEnum != .disabled {
            config.enableInAppMessaging(inAppConsentStrategy: inAppConsentStrategyEnum == .autoEnroll ? .autoEnroll : .explicitByUser)
        }

        config.setInAppDeepLinkHandler { inAppButtonPress in
            OptimoveReactNativeEmitter.shared.emit(event: InAppDeeplinkPressedEvent(inAppButtonPress: inAppButtonPress))
        }

        overrideInstallInfo(builder: config)

        Optimove.initialize(with: config.build())
        OptimoveInApp.setOnInboxUpdated {
            OptimoveReactNativeEmitter.shared.emit(event: InAppInboxUpdatedEvent())
        }
    }

    private static func overrideInstallInfo(builder: OptimoveConfigBuilder) -> Void {
        let runtimeInfo: [String : AnyObject] = [
            "id": runtimeType as AnyObject,
            "version": runtimeVersion as AnyObject,
        ]

        let sdkInfo: [String : AnyObject] = [
            "id": sdkType as AnyObject,
            "version": sdkVersion as AnyObject,
        ]

        builder.setRuntimeInfo(runtimeInfo: runtimeInfo);
        builder.setSdkInfo(sdkInfo: sdkInfo);

        var isRelease = true
        #if DEBUG
            isRelease = false
        #endif
        builder.setTargetType(isRelease: isRelease);
    }

    @objc(application:userActivity:restorationHandler:)
    public static func application(_ application: UIApplication, userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
            return Optimove.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

    @available(iOS 13.0, *)
    @objc(scene:session:options:)
    public static func scene(_ scene: UIScene, session: UISceneSession, options: UIScene.ConnectionOptions) {
        guard let _ = (scene as? UIWindowScene) else { return }

        // Deep links from cold starts
        if let userActivity = options.userActivities.first {
            Optimove.shared.scene(scene, continue: userActivity)
        }
    }

    @available(iOS 13.0, *)
    @objc(scene:userActivity:)
    public static func scene(_ scene: UIScene, userActivity: NSUserActivity) {
        Optimove.shared.scene(scene, continue: userActivity)
    }
}

enum InAppConsentStrategy: String {
    case autoEnroll = "auto-enroll"
    case explicitByUser = "explicit-by-user"
    case disabled = "in-app-disabled"
}
