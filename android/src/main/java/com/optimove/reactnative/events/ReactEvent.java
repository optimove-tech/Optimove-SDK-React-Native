package com.optimove.reactnative.events;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.WritableMap;

public interface ReactEvent {
  @NonNull
  String getEventType();
  WritableMap getData();
  boolean canArriveBeforeBeingListenedTo();
}
