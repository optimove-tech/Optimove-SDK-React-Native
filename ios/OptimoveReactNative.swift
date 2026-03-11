import Foundation
import OptimoveSDK
import React

@objc(OptimoveReactNative)
class OptimoveReactNative: RCTEventEmitter {

    @objc(initialize)
    func initialize() -> Void {
        OptimoveReactNativeEmitter.shared.setEmitter(emitter: self)
    }

    override func startObserving() {
        OptimoveReactNativeEmitter.shared.setEmitter(emitter: self)
    }

    override func addListener(_ eventName: String!) {
        if OptimoveReactNativeEmitter.shared.emitter == nil {
            OptimoveReactNativeEmitter.shared.setEmitter(emitter: self)
        }
        super.addListener(eventName)
        OptimoveReactNativeEmitter.shared.addListener(eventName: eventName)
    }

    @objc
    func getVisitorId(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
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
    func reportEvent(_ event: String, parameters: NSDictionary?) {
        if parameters == nil {
            Optimove.reportEvent(name: event)
            return
        }

        Optimove.reportEvent(name: event, parameters: parameters as! [String: Any])
    }

    @objc
    func reportScreenVisit(_ screenName: String, screenCategory: String?) {
        Optimove.reportScreenVisit(screenTitle: screenName, screenCategory: screenCategory)
    }

    @objc
    func inAppDeleteMessageWithIdFromInbox(_ id: Double, resolve: @escaping RCTPromiseResolveBlock,
                                           reject: @escaping RCTPromiseRejectBlock) {
        let inboxItems: [InAppInboxItem] = OptimoveInApp.getInboxItems()
        let itemId = Int(id)

        for item in inboxItems {
            if item.id == itemId {
                resolve(OptimoveInApp.deleteMessageFromInbox(item: item))
                return
            }
        }

        resolve(false)
    }

    @objc
    func inAppPresentItemWithId(_ id: Double, resolve: @escaping RCTPromiseResolveBlock,
                                reject: @escaping RCTPromiseRejectBlock) {
        let inboxItems: [InAppInboxItem] = OptimoveInApp.getInboxItems()
        var presentationResult: InAppMessagePresentationResult = .FAILED
        let itemId = Int(id)

        for item in inboxItems {
            if item.id == itemId {
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
        case .PAUSED:
            resolve(3)
        }
    }

    @objc
    func inAppMarkAsReadItemWithId(_ id: Double, resolve: @escaping RCTPromiseResolveBlock,
                                reject: @escaping RCTPromiseRejectBlock) {
        let inboxItems: [InAppInboxItem] = OptimoveInApp.getInboxItems()
        let itemId = Int(id)

        for item in inboxItems {
            if item.id == itemId {
                resolve(OptimoveInApp.markAsRead(item: item))
                return
            }
        }

        resolve(false)
    }

    @objc
    func inAppGetInboxItems(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
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
    func inAppMarkAllInboxItemsAsRead(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        resolve(OptimoveInApp.markAllInboxItemsAsRead())
    }

    @objc
    func embeddedMessagingGetMessages(_ containers: NSArray, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let service = try? EmbeddedMessagesService.getInstance() else {
            reject("NOT_INITIALIZED", "Embedded messaging is not initialized", nil)
            return
        }

        let containerOptions: [ContainerRequestOptions] = containers.compactMap { item -> ContainerRequestOptions? in
            guard let dict = item as? NSDictionary,
                  let data = try? JSONSerialization.data(withJSONObject: dict) else { return nil }
            return try? JSONDecoder().decode(ContainerRequestOptions.self, from: data)
        }

        service.getMessagesAsync(containers: containerOptions) { result in
            switch result {
            case .successMessages(let response):
                let formatter = ISO8601DateFormatter()
                var resultMap: [String: Any] = [:]
                for (containerId, container) in response {
                    resultMap[containerId] = [
                        "containerId": containerId,
                        "messages": container.messages.map { self.mapEmbeddedMessage($0, formatter: formatter) }
                    ]
                }
                resolve(resultMap)
            case .errorUserNotSet:
                reject("USER_NOT_SET", "User is not set", nil)
            case .errorCredentialsNotSet:
                reject("CREDENTIALS_NOT_SET", "Embedded messaging credentials are not set", nil)
            case .error(let error):
                reject("ERROR", error.localizedDescription, nil)
            case .success:
                reject("ERROR", "Unexpected result type", nil)
            }
        }
    }

    @objc
    func embeddedMessagingDeleteMessage(_ message: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let service = try? EmbeddedMessagesService.getInstance() else {
            reject("NOT_INITIALIZED", "Embedded messaging is not initialized", nil)
            return
        }

        guard let embeddedMessage = try? embeddedMessageFrom(message) else {
            reject("INVALID_MESSAGE", "Failed to parse message", nil)
            return
        }

        service.deleteMessagesAsync(message: embeddedMessage) { result in
            switch result {
            case .success:
                resolve(nil)
            case .errorUserNotSet:
                reject("USER_NOT_SET", "User is not set", nil)
            case .errorCredentialsNotSet:
                reject("CREDENTIALS_NOT_SET", "Embedded messaging credentials are not set", nil)
            case .error(let error):
                reject("ERROR", error.localizedDescription, nil)
            case .successMessages:
                reject("ERROR", "Unexpected result type", nil)
            }
        }
    }

    @objc
    func embeddedMessagingReportClickMetric(_ message: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let service = try? EmbeddedMessagesService.getInstance() else {
            reject("NOT_INITIALIZED", "Embedded messaging is not initialized", nil)
            return
        }

        guard let embeddedMessage = try? embeddedMessageFrom(message) else {
            reject("INVALID_MESSAGE", "Failed to parse message", nil)
            return
        }

        service.reportClickMetricAsync(message: embeddedMessage) { result in
            switch result {
            case .success:
                resolve(nil)
            case .errorUserNotSet:
                reject("USER_NOT_SET", "User is not set", nil)
            case .errorCredentialsNotSet:
                reject("CREDENTIALS_NOT_SET", "Embedded messaging credentials are not set", nil)
            case .error(let error):
                reject("ERROR", error.localizedDescription, nil)
            case .successMessages:
                reject("ERROR", "Unexpected result type", nil)
            }
        }
    }

    @objc
    func embeddedMessagingSetAsRead(_ message: NSDictionary, isRead: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let service = try? EmbeddedMessagesService.getInstance() else {
            reject("NOT_INITIALIZED", "Embedded messaging is not initialized", nil)
            return
        }

        guard let embeddedMessage = try? embeddedMessageFrom(message) else {
            reject("INVALID_MESSAGE", "Failed to parse message", nil)
            return
        }

        let completion: EmbeddedMessagesService.EmbeddedMessagingSetHandler = { result in
            switch result {
            case .success:
                resolve(nil)
            case .errorUserNotSet:
                reject("USER_NOT_SET", "User is not set", nil)
            case .errorCredentialsNotSet:
                reject("CREDENTIALS_NOT_SET", "Embedded messaging credentials are not set", nil)
            case .error(let error):
                reject("ERROR", error.localizedDescription, nil)
            case .successMessages:
                reject("ERROR", "Unexpected result type", nil)
            }
        }

        if isRead {
            service.setAsReadAsync(message: embeddedMessage, completion: completion)
        } else {
            service.setAsUnReadAsync(message: embeddedMessage, completion: completion)
        }
    }

    private func mapEmbeddedMessage(_ msg: EmbeddedMessage, formatter: ISO8601DateFormatter) -> [String: Any?] {
        let payloadString: String
        if let data = try? JSONSerialization.data(withJSONObject: msg.payload.mapValues { $0.value }),
           let str = String(data: data, encoding: .utf8) {
            payloadString = str
        } else {
            payloadString = "{}"
        }

        return [
            "id": msg.id,
            "containerId": msg.containerId,
            "templateId": msg.templateId,
            "title": msg.title,
            "content": msg.content,
            "media": msg.media,
            "url": msg.url,
            "payload": payloadString,
            "campaignKind": msg.campaignKind,
            "messageLayoutType": msg.messageLayoutType,
            "engagementId": msg.engagementId,
            "customerId": msg.customerId,
            "isVisitor": msg.isVisitor,
            "createdAt": formatter.string(from: msg.createdAt),
            "updatedAt": msg.updatedAt.map { formatter.string(from: $0) },
            "executionDateTime": msg.executionDateTime,
            "readAt": msg.readAt,
            "expiryDate": msg.expiryDate.map { formatter.string(from: $0) },
        ]
    }

    private func embeddedMessageFrom(_ dict: NSDictionary) throws -> EmbeddedMessage {
        var mutableDict = dict as! [String: Any]

        if let payloadStr = mutableDict["payload"] as? String,
           let payloadData = payloadStr.data(using: .utf8),
           let payloadDict = try? JSONSerialization.jsonObject(with: payloadData) {
            mutableDict["payload"] = payloadDict
        } else {
            mutableDict["payload"] = [String: Any]()
        }

        let data = try JSONSerialization.data(withJSONObject: mutableDict)
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return try decoder.decode(EmbeddedMessage.self, from: data)
    }

    @objc
    func inAppGetInboxSummary(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        OptimoveInApp.getInboxSummaryAsync(inboxSummaryBlock: { inAppInboxSummary in
            var inAppInboxSummaryMap = [String: Any?]()
            inAppInboxSummaryMap["totalCount"] = inAppInboxSummary?.totalCount
            inAppInboxSummaryMap["unreadCount"] = inAppInboxSummary?.unreadCount
            resolve(inAppInboxSummaryMap)
        })
    }

    @objc
    override func removeListeners(_ count: Double) {
        // Implementation for removeListeners - required by the protocol
        for _ in 0..<Int(count) {
            super.removeListeners(1)
        }
    }

    override func supportedEvents() -> [String] {
        return EventTypes.allCases.map { $0.rawValue }
    }

    // MARK: - TurboModule
    override static func moduleName() -> String! {
        return "OptimoveReactNative"
    }
}
