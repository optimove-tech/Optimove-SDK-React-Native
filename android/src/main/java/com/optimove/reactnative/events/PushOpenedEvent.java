package com.optimove.reactnative.events;

import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.optimove.android.optimobile.PushMessage;
import com.optimove.reactnative.JSONtoMapMapper;

public class PushOpenedEvent implements ReactEvent {

  private static final String TAG = PushOpenedEvent.class.getName();
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
    try {
      map.putMap("data", JSONtoMapMapper.jsonToReact(push.getData()));
    } catch (Throwable e) {
      Log.e(TAG, String.format("Couldn't parse push data due to: %s", e.getMessage()));
    }
    map.putString("url", url != null ? url.toString() : null);

    return map;
  }
}
