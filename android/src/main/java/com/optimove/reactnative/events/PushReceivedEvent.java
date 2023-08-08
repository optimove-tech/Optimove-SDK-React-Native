package com.optimove.reactnative.events;

import androidx.annotation.NonNull;

import com.optimove.android.optimobile.PushMessage;

public class PushReceivedEvent extends PushEvent implements ReactEvent {

  private static final String TAG = PushReceivedEvent.class.getName();

  public PushReceivedEvent(@NonNull PushMessage push) {
    super(push);
  }

  @Override
  protected String getTag() {
    return TAG;
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
