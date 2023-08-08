package com.optimove.reactnative.events;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.WritableMap;
import com.optimove.android.optimobile.PushMessage;

public class PushOpenedEvent extends PushEvent implements ReactEvent {

  private static final String TAG = PushOpenedEvent.class.getName();
  @Nullable
  private final String actionId;

  public PushOpenedEvent(@NonNull PushMessage push, @Nullable String actionId) {
    super(push);
    this.actionId = actionId;
  }

  @Override
  public boolean canArriveBeforeBeingListenedTo() {
    return true;
  }

  @NonNull
  @Override
  public String getEventType() {
    return "push.opened";
  }

  @Override
  protected String getTag() {
    return TAG;
  }

  @Override
  public WritableMap getData() {
    WritableMap map = super.getData();

    if (null != actionId) {
      map.putString("actionId", actionId);
    }

    return map;
  }
}
