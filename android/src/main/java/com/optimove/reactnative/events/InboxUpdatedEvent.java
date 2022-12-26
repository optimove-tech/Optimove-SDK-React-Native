package com.optimove.reactnative.events;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.WritableMap;

public class InboxUpdatedEvent implements ReactEvent {
  @NonNull
  @Override
  public String getEventType() {
    return "inbox.updated";
  }

  @Override
  public WritableMap getData() {
    return null;
  }

  @Override
  public boolean canArriveBeforeBeingListenedTo() {
    return false;
  }
}
