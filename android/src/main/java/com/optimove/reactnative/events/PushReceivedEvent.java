package com.optimove.reactnative.events;

import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.optimove.android.optimobile.PushMessage;
import com.optimove.reactnative.JSONtoMapMapper;

public class PushReceivedEvent implements ReactEvent {

  private static final String TAG = PushReceivedEvent.class.getName();
  @NonNull
  private final PushMessage push;

  public PushReceivedEvent(@NonNull PushMessage push) {
    this.push = push;
  }

  @Override
  public WritableMap getData() {
    WritableMap map = new WritableNativeMap();
    Uri url = push.getUrl();

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

  @Override
  public boolean canArriveBeforeBeingListenedTo() {
    return false;
  }

  @NonNull
  @Override
  public String getEventType() {
    return "push.received";
  }
}
