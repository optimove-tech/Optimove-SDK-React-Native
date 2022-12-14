package com.optimove.reactnative.events;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.optimove.android.optimobile.InAppDeepLinkHandlerInterface;

public class InAppDeeplinkEvent implements ReactEvent {

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
    map.putString("deepLinkData", buttonPress.getDeepLinkData().toString());
    if (buttonPress.getMessageData() != null) {
      map.putString("messageData", buttonPress.getMessageData().toString());
    }

    return map;
  }

  @Override
  public boolean canArriveBeforeBeingListenedTo() {
    return false;
  }
}
