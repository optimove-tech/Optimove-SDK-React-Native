import Foundation

class OptimoveReactNativeEmitter {
    weak var emitter: OptimoveReactNative?
    private var eventQueue: [ReactEvent] = []
    private var listenedEvents: [EventTypes: Bool] = EventTypes.allCases.reduce(into: [EventTypes: Bool]()) {
        $0[$1] = false
    }
    
    static let shared = OptimoveReactNativeEmitter()
    
    private init() {}

    public func setEmitter(emitter: OptimoveReactNative){
        self.emitter = emitter
        self.emitAllListenedQueueEvents()
    }
    
    public func emit(event: ReactEvent){
        
        if emitter != nil && listenedEvents[event.event]! {
            emitter!.sendEvent(withName: event.event.rawValue, body: event.data)
            return
        }
        
        if event.canArriveBeforeBeingListenedTo {
            eventQueue.append(event)
        }
    }
    
    public func addListener(eventName: String){
        EventTypes.allCases.forEach { eventType in
            if eventType.rawValue == eventName {
                listenedEvents[eventType] = true
            }
        }
        
        self.emitAllListenedQueueEvents()
    }
    
    private func emitAllListenedQueueEvents(){
        self.eventQueue = self.eventQueue.filter({ event in
            if listenedEvents[event.event]! {
                emitter!.sendEvent(withName: event.event.rawValue, body: event.data)
                return false
            }
            
            return true
        })
    }
}
