import Foundation
import OptimoveSDK

@objc(OptimoveReactNative)
class OptimoveReactNative: RCTEventEmitter {

    @objc(initialize)
    func initialize() -> Void {
        OptimoveReactNativeEmitter.shared.setEmitter(emitter: self)
    }

    override func addListener(_ eventName: String!) {
        super.addListener(eventName)
        OptimoveReactNativeEmitter.shared.addListener(eventName: eventName)
    }

    @objc
    func getVisitorId(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        resolve(Optimove.getVisitorID())
    }

    @objc
    func setUserId(_ userId: String) {
        Optimove.setUserId(userId)
    }

    @objc
    func setUserEmail(_ email: String) {
        Optimove.setUserEmail(email: email)
    }

    @objc
    func registerUser(_ userId: String, email: String) {
        Optimove.registerUser(sdkId: userId, email: email)
    }

    @objc
    func signOutUser() {
        Optimove.signOutUser()
    }

    @objc
    func pushRequestDeviceToken() {
        Optimove.shared.pushRequestDeviceToken()
    }

    @objc
    func pushUnregister() {
        Optimove.shared.pushUnregister()
    }

    @objc
    func reportEvent(_ event: String, parameters: NSDictionary? = nil) {
        if parameters == nil {
            Optimove.reportEvent(name: event)
            return
        }

        Optimove.reportEvent(name: event, parameters: parameters as! [String: Any])
    }

    @objc
    func reportScreenVisit(_ title: String, screenCategory category: String? = nil) {
        Optimove.reportScreenVisit(screenTitle: title, screenCategory: category)
    }

    @objc
    func inAppDeleteMessageWithIdFromInbox(_ id: Int, resolver resolve: RCTPromiseResolveBlock,
                                           rejecter reject: RCTPromiseRejectBlock) {
        let inboxItems: [InAppInboxItem] = OptimoveInApp.getInboxItems()

        for item in inboxItems {
            if item.id == id {
                resolve(OptimoveInApp.deleteMessageFromInbox(item: item))
                return
            }
        }

        resolve(false)
    }

    @objc
    func inAppPresentItemWithId(_ id: Int, resolver resolve: RCTPromiseResolveBlock,
                                rejecter reject: RCTPromiseRejectBlock) {
        let inboxItems: [InAppInboxItem] = OptimoveInApp.getInboxItems()
        var presentationResult: InAppMessagePresentationResult = .FAILED

        for item in inboxItems {
            if item.id == id {
                presentationResult = OptimoveInApp.presentInboxMessage(item: item)
                break
            }
        }

        switch presentationResult {
        case .PRESENTED:
            resolve(0)
        case .EXPIRED:
            resolve(1)
        case .FAILED:
            resolve(2)
        }
    }

    @objc
    func inAppMarkAsReadItemWithId(_ id: Int, resolver resolve: RCTPromiseResolveBlock,
                                rejecter reject: RCTPromiseRejectBlock) {
        let inboxItems: [InAppInboxItem] = OptimoveInApp.getInboxItems()

        for item in inboxItems {
            if item.id == id {
                resolve(OptimoveInApp.markAsRead(item: item))
                return
            }
        }

        resolve(false)
    }

    @objc
    func inAppGetInboxItems(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        let inboxItems: [InAppInboxItem] = OptimoveInApp.getInboxItems()

        var inboxItemsMaps: [[String: Any?]] = []
        let dateFormatter = ISO8601DateFormatter()

        inboxItems.forEach { item in
            var inboxItemMap = [String: Any?]()

            inboxItemMap["id"] = item.id
            inboxItemMap["title"] = item.title
            inboxItemMap["subtitle"] = item.subtitle
            inboxItemMap["sentAt"] = dateFormatter.string(from:  item.sentAt)
            inboxItemMap["availableFrom"] = item.availableFrom != nil ? dateFormatter.string(from:  item.availableFrom!) : nil
            inboxItemMap["availableTo"] = item.availableTo != nil ? dateFormatter.string(from:  item.availableTo!) : nil
            inboxItemMap["dismissedAt"] = item.dismissedAt != nil ? dateFormatter.string(from:  item.dismissedAt!) : nil
            inboxItemMap["isRead"] = item.isRead()
            inboxItemMap["imageUrl"] = item.getImageUrl()?.absoluteString
            inboxItemMap["data"] = item.data

            inboxItemsMaps.append(inboxItemMap)
        }

        resolve(inboxItemsMaps)
    }


    @objc
    func inAppUpdateConsent(_ consentGiven: Bool) {
        OptimoveInApp.updateConsent(forUser: consentGiven)
    }

    @objc
    func inAppMarkAllInboxItemsAsRead(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        resolve(OptimoveInApp.markAllInboxItemsAsRead())
    }

    @objc
    func inAppGetInboxSummary(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        OptimoveInApp.getInboxSummaryAsync(inboxSummaryBlock: { inAppInboxSummary in
            var inAppInboxSummaryMap = [String: Any?]()
            inAppInboxSummaryMap["totalCount"] = inAppInboxSummary?.totalCount
            inAppInboxSummaryMap["unreadCount"] = inAppInboxSummary?.unreadCount
            resolve(inAppInboxSummaryMap)
        })
    }

    override func supportedEvents() -> [String] {
        return EventTypes.allCases.map { $0.rawValue }
    }
}
