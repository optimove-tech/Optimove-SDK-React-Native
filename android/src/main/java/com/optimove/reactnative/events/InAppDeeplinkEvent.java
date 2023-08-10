package com.optimove.reactnative.events;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.optimove.android.optimobile.InAppDeepLinkHandlerInterface;
import com.optimove.reactnative.JSONtoMapMapper;

import org.json.JSONObject;

public class InAppDeeplinkEvent implements ReactEvent {

  private static final String TAG = InAppDeeplinkEvent.class.getName();
  private final InAppDeepLinkHandlerInterface.InAppButtonPress buttonPress;

  public InAppDeeplinkEvent(InAppDeepLinkHandlerInterface.InAppButtonPress buttonPress) {
    this.buttonPress = buttonPress;
  }

  @NonNull
  @Override
  public String getEventType() {
    return "in-app.deepLinkPressed";
  }

  @Override
  public WritableMap getData() {
    WritableMap map = new WritableNativeMap();

    map.putInt("messageId", buttonPress.getMessageId());

    try {
      map.putMap("deepLinkData", JSONtoMapMapper.jsonToReact(buttonPress.getDeepLinkData()));
    } catch (Throwable e) {
      Log.e(TAG, String.format("Couldn't parse deepLink data due to: %s", e.getMessage()));
    }

    if (buttonPress.getMessageData() == null) {
      map.putNull("messageData");
      return map;
    }

    try {
      map.putMap("messageData", JSONtoMapMapper.jsonToReact(buttonPress.getMessageData()));
    } catch (Throwable e) {
      map.putNull("messageData");
      Log.e(TAG, String.format("Couldn't parse message data due to: %s", e.getMessage()));
    }

    return map;
  }

  @Override
  public boolean canArriveBeforeBeingListenedTo() {
    return false;
  }
}
