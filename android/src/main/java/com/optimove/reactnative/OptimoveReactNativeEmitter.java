package com.optimove.reactnative;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.optimove.reactnative.events.ReactEvent;

import java.util.ArrayList;
import java.util.HashMap;

public class OptimoveReactNativeEmitter {

  private static OptimoveReactNativeEmitter emitter;
  private final Object eventQueueSync = new Object();

  public static synchronized void initialize(){
    if (emitter != null) {
      return;
    }

    emitter = new OptimoveReactNativeEmitter();
  }

  public static OptimoveReactNativeEmitter getInstance() {
    if (emitter == null) {
      throw new IllegalStateException("OptimoveReactNativeEmitter.initialize() must be called");
    }
    return emitter;
  }

  @Nullable
  private ReactContext reactContext;
  private final ArrayList<ReactEvent> eventQueue = new ArrayList<>();
  private final HashMap<String, Boolean> listenedEvents = new HashMap<>();

  public void setReactContext(@NonNull ReactContext reactContext) {
    this.reactContext = reactContext;
    this.emitAllListenedQueueEvents();
  }

  public void emit(@NonNull ReactEvent event) {
    if (reactContext != null && listenedEvents.containsKey(event.getEventType())) {
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(event.getEventType(), event.getData());
      return;
    }

    if (event.canArriveBeforeBeingListenedTo()) {
      synchronized (eventQueueSync) {
        eventQueue.add(event);
      }
    }
  }

  public void addListener(String event) {
    listenedEvents.put(event, true);
    this.emitAllListenedQueueEvents();
  }

  @Nullable
  public ReactContext getReactContext() {
    return reactContext;
  }

  private void emitAllListenedQueueEvents(){
    if (reactContext == null) {
      return;
    }

    synchronized (eventQueueSync) {
      final ArrayList<ReactEvent> unlistenedEventQueue = new ArrayList<>();

      for (ReactEvent event: eventQueue) {
        if (listenedEvents.containsKey(event.getEventType())) {
          reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(event.getEventType(), event.getData());
        } else {
          unlistenedEventQueue.add(event);
        }
      }

      eventQueue.clear();
      eventQueue.addAll(unlistenedEventQueue);
    }
  }
}
