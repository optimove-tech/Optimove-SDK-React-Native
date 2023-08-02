import OptimoveSDK

enum EventTypes: String, CaseIterable {
    case pushReceived = "push.received"
    case pushOpened = "push.opened"
    case deepLinkResolved = "deep-linking.linkResolved"
    case inAppInboxUpdated = "inbox.updated"
    case inAppDeepLinkPressed = "in-app.deepLinkPressed"
}

protocol ReactEvent {
    var event: EventTypes { get }
    var data: [String: Any?]? { get set }
    var canArriveBeforeBeingListenedTo: Bool { get set }
}

protocol PushReactEvent {}
extension PushReactEvent {
    func getPushNotificatioMap(from pushNotification: PushNotification) -> [String: Any?] {
        var data = [String: Any?]()
        data["id"] = pushNotification.id
        data["title"] = (pushNotification.aps["alert"] as? Dictionary)?["title"]
        data["message"] = (pushNotification.aps["alert"] as? Dictionary)?["body"]
        data["data"] = pushNotification.data
        data["url"] = pushNotification.url?.absoluteString
        data["actionId"] = pushNotification.actionIdentifier

        return data
    }
}

struct PushOpenedEvent: ReactEvent, PushReactEvent {
    let event: EventTypes = EventTypes.pushOpened
    var data: [String : Any?]?
    var canArriveBeforeBeingListenedTo: Bool = true
    
    init(pushNotification: PushNotification) {
        self.data = getPushNotificatioMap(from: pushNotification)
    }
}

struct PushReceived: ReactEvent, PushReactEvent {
    let event: EventTypes = EventTypes.pushReceived
    var data: [String : Any?]?
    var canArriveBeforeBeingListenedTo: Bool = false
    
    init(pushNotification: PushNotification) {
        self.data = getPushNotificatioMap(from: pushNotification)
    }
}

struct DeeplinkResolvedEvent: ReactEvent {
    let event: EventTypes = EventTypes.deepLinkResolved
    var data: [String : Any?]?
    var canArriveBeforeBeingListenedTo: Bool = true
    
    init(deepLinkResolution: DeepLinkResolution) {
        var data = [String: Any?]()
        var urlString: String

        switch deepLinkResolution {
        case .lookupFailed(let dl):
            urlString = dl.absoluteString
            data["resolution"] = "LOOKUP_FAILED"
        case .linkNotFound(let dl):
            urlString = dl.absoluteString
            data["resolution"] = "LINK_NOT_FOUND"
        case .linkExpired(let dl):
            urlString = dl.absoluteString
            data["resolution"] = "LINK_EXPIRED"
        case .linkLimitExceeded(let dl):
            urlString = dl.absoluteString
            data["resolution"] = "LINK_LIMIT_EXCEEDED"
        case .linkMatched(let dl):
            urlString = dl.url.absoluteString
            data["resolution"] = "LINK_MATCHED"
            var content = [String: Any?]()
            content["title"] = dl.content.title
            content["description"] = dl.content.description

            data["content"] = content
            data["linkData"] = dl.data
        }
        data["url"] = urlString
        
        self.data = data
    }
}

struct InAppInboxUpdatedEvent: ReactEvent {
    let event: EventTypes = EventTypes.inAppInboxUpdated
    var data: [String : Any?]? = nil
    var canArriveBeforeBeingListenedTo: Bool = false
}

struct InAppDeeplinkPressedEvent: ReactEvent {
    let event: EventTypes = EventTypes.inAppDeepLinkPressed
    var data: [String : Any?]?
    var canArriveBeforeBeingListenedTo: Bool = false
    
    init(inAppButtonPress: InAppButtonPress) {
        var data = [String: Any?]()
        
        data["deepLinkData"] = inAppButtonPress.deepLinkData
        data["messageData"] = inAppButtonPress.messageData
        data["messageId"] = inAppButtonPress.messageId
            
        self.data = data
    }
}

