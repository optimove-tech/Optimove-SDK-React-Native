package com.optimove.reactnative.events;

import android.net.Uri;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.optimove.android.optimobile.PushMessage;

public class PushOpenedEvent implements ReactEvent {

  @NonNull
  private final PushMessage push;
  @Nullable
  private final String actionId;

  public PushOpenedEvent(@NonNull PushMessage push, @Nullable String actionId) {
    this.push = push;
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
  public WritableMap getData() {
    WritableMap map = new WritableNativeMap();
    Uri url = push.getUrl();

    if (null != actionId) {
      map.putString("actionId", actionId);
    }

    map.putInt("id", push.getId());
    map.putString("title", push.getTitle());
    map.putString("message", push.getMessage());
    map.putString("data", push.getData().toString());
    map.putString("url", url != null ? url.toString() : null);

    return map;
  }
}
