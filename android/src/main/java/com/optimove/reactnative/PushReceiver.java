package com.optimove.reactnative;

import android.app.Activity;
import android.app.TaskStackBuilder;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;

import com.optimove.android.Optimove;
import com.optimove.android.optimobile.Optimobile;
import com.optimove.android.optimobile.PushBroadcastReceiver;
import com.optimove.android.optimobile.PushMessage;
import com.optimove.reactnative.events.PushOpenedEvent;
import com.optimove.reactnative.events.PushReceivedEvent;

public class PushReceiver extends PushBroadcastReceiver {

  @Override
  protected void onPushReceived(Context context, PushMessage pushMessage) {
    super.onPushReceived(context, pushMessage);
    OptimoveReactNativeEmitter.getInstance().emit(new PushReceivedEvent(pushMessage));
  }

  @Override
  protected void onPushOpened(Context context, PushMessage pushMessage) {
    try {
      Optimove.getInstance().pushTrackOpen(pushMessage.getId());
    } catch (Optimobile.UninitializedException ignored) {
    }

    PushReceiver.handlePushOpen(context, pushMessage, null);
  }

  @Override
  protected Intent getPushOpenActivityIntent(Context context, PushMessage pushMessage) {
    Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());

    if (null == launchIntent) {
      return null;
    }

    launchIntent.putExtra(PushMessage.EXTRAS_KEY, pushMessage);

    return launchIntent;
  }


  @SuppressWarnings("unchecked")
  public static void handlePushOpen(Context context, PushMessage pushMessage, String actionId) {
    PushReceiver pr = new PushReceiver();
    Intent launchIntent = pr.getPushOpenActivityIntent(context, pushMessage);

    if (null == launchIntent) {
      return;
    }

    ComponentName component = launchIntent.getComponent();
    if (null == component) {
      return;
    }

    Class<? extends Activity> cls = null;
    try {
      cls = (Class<? extends Activity>) Class.forName(component.getClassName());
    } catch (ClassNotFoundException e) {
      /* Noop */
    }

    // Ensure we're trying to launch an Activity
    if (null == cls) {
      return;
    }

    Activity currentActivity = OptimoveReactNativeEmitter.getInstance().getReactContext() != null ? OptimoveReactNativeEmitter.getInstance().getReactContext().getCurrentActivity() : null;
    if (null != currentActivity) {
      Intent existingIntent = currentActivity.getIntent();
      addDeepLinkExtras(pushMessage, existingIntent);
    }

    if (null != pushMessage.getUrl()) {
      launchIntent = new Intent(Intent.ACTION_VIEW, pushMessage.getUrl());

      addDeepLinkExtras(pushMessage, launchIntent);

      TaskStackBuilder taskStackBuilder = TaskStackBuilder.create(context);
      taskStackBuilder.addParentStack(component);
      taskStackBuilder.addNextIntent(launchIntent);
      taskStackBuilder.startActivities();
    } else {
      launchIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

      addDeepLinkExtras(pushMessage, launchIntent);

      context.startActivity(launchIntent);
    }

    OptimoveReactNativeEmitter.getInstance().emit(new PushOpenedEvent(pushMessage, actionId));
  }
}
