package com.optimove.reactnative;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;
import com.optimove.android.Optimove;
import com.optimove.android.optimobile.InAppInboxItem;
import com.optimove.android.optimobile.OptimoveInApp;

import org.json.JSONObject;

import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

@ReactModule(name = OptimoveReactNativeModule.NAME)
public class OptimoveReactNativeModule extends NativeOptimoveReactNativeSpec {

  public static final String NAME = "OptimoveReactNative";
  private static final String TAG = OptimoveReactNativeModule.class.getName();

  public OptimoveReactNativeModule(@NonNull ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public void initialize() {
    super.initialize();
    OptimoveReactNativeEmitter.getInstance().setReactContext(super.getReactApplicationContext());
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @Override
  public void setUserId(String userId) {
    Optimove.getInstance().setUserId(userId);
  }

  @Override
  public void setUserEmail(String email) {
    Optimove.getInstance().setUserEmail(email);
  }

  @Override
  public void registerUser(String userId, String email) {
    Optimove.getInstance().registerUser(userId, email);
  }

  @Override
  public void reportScreenVisit(@NonNull String screenName, @Nullable String screenCategory) {
    Optimove.getInstance().reportScreenVisit(screenName, screenCategory);
  }

  @Override
  public void reportEvent(String event, @Nullable ReadableMap parameters) {
    if (parameters == null) {
      Optimove.getInstance().reportEvent(event);
      return;
    }

    Optimove.getInstance().reportEvent(event, parameters.toHashMap());
  }

  @Override
  public void getVisitorId(Promise promise) {
    promise.resolve(Optimove.getInstance().getVisitorId());
  }

  @Override
  public void signOutUser() {
    Optimove.getInstance().signOutUser();
  }

  @Override
  public void pushRequestDeviceToken() {
    Optimove.getInstance().pushRequestDeviceToken();
  }

  @Override
  public void pushUnregister() {
    Optimove.getInstance().pushUnregister();
  }

  @Override
  public void inAppDeleteMessageWithIdFromInbox(double id, Promise promise) {
    boolean deleted = false;
    int messageId = (int) id;

    List<InAppInboxItem> items = OptimoveInApp.getInstance().getInboxItems();
    for (InAppInboxItem item : items) {
      if (messageId == item.getId()) {
        deleted = OptimoveInApp.getInstance().deleteMessageFromInbox(item);
        break;
      }
    }

    promise.resolve(deleted);
  }

  @Override
  public void inAppPresentItemWithId(double id, Promise promise) {
    List<InAppInboxItem> items = OptimoveInApp.getInstance().getInboxItems();
    int messageId = (int) id;

    OptimoveInApp.InboxMessagePresentationResult presentationResult = OptimoveInApp.InboxMessagePresentationResult.FAILED;

    for (InAppInboxItem item : items) {
      if (item.getId() == messageId) {
        presentationResult = OptimoveInApp.getInstance().presentInboxMessage(item);
        break;
      }
    }

    switch (presentationResult) {
      case PRESENTED:
        promise.resolve(0);
        break;
      case FAILED_EXPIRED:
        promise.resolve(1);
        break;
      case PAUSED:
        promise.resolve(3);
        break;
      default:
        promise.resolve(2);
        break;
    }
  }

  @Override
  public void inAppMarkAsReadItemWithId(double id, Promise promise) {
    List<InAppInboxItem> items = OptimoveInApp.getInstance().getInboxItems();
    int messageId = (int) id;

    for (InAppInboxItem item : items) {
      if (item.getId() != messageId) {
        continue;
      }

      promise.resolve(OptimoveInApp.getInstance().markAsRead(item));
      return;
    }

    promise.resolve(false);
  }

  @Override
  public void inAppGetInboxItems(Promise promise) {
    SimpleDateFormat formatter;
    formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US);
    formatter.setTimeZone(TimeZone.getTimeZone("UTC"));

    List<InAppInboxItem> inboxItems = OptimoveInApp.getInstance().getInboxItems();

    WritableArray results = new WritableNativeArray();
    for (InAppInboxItem item : inboxItems) {
      results.pushMap(mapInboxItemToMap(item, formatter));
    }

    promise.resolve(results);
  }

  private WritableMap mapInboxItemToMap(InAppInboxItem item, SimpleDateFormat formatter){
    WritableMap mapped = new WritableNativeMap();
    mapped.putInt("id", item.getId());
    mapped.putString("title", item.getTitle());
    mapped.putString("subtitle", item.getSubtitle());
    mapped.putBoolean("isRead", item.isRead());
    mapped.putString("sentAt", formatter.format(item.getSentAt()));

    Date availableFrom = item.getAvailableFrom();
    Date availableTo = item.getAvailableTo();
    Date dismissedAt = item.getDismissedAt();
    JSONObject data = item.getData();
    URL imageUrl = item.getImageUrl();

    if (null == availableFrom) {
      mapped.putNull("availableFrom");
    } else {
      mapped.putString("availableFrom", formatter.format(availableFrom));
    }

    if (null == availableTo) {
      mapped.putNull("availableTo");
    } else {
      mapped.putString("availableTo", formatter.format(availableTo));
    }

    if (null == dismissedAt) {
      mapped.putNull("dismissedAt");
    } else {
      mapped.putString("dismissedAt", formatter.format(dismissedAt));
    }

    if (data == null) {
      mapped.putNull("data");
    } else {
      try {
        mapped.putMap("data", JSONtoMapMapper.jsonToReact(data));
      } catch (Throwable e) {
        Log.e(TAG, String.format("Couldn't parse message data due to: %s", e.getMessage()));
      }
    }

    if (imageUrl == null) {
      mapped.putNull("imageUrl");
    } else {
      mapped.putString("imageUrl", imageUrl.toString());
    }

    return mapped;
  }

  @Override
  public void inAppMarkAllInboxItemsAsRead(Promise promise) {
    promise.resolve(OptimoveInApp.getInstance().markAllInboxItemsAsRead());
  }

  @Override
  public void inAppUpdateConsent(boolean consentGiven) {
    OptimoveInApp.getInstance().updateConsentForUser(consentGiven);
  }

  @Override
  public void inAppGetInboxSummary(Promise promise) {
    OptimoveInApp.getInstance().getInboxSummaryAsync(summary -> {
      if (summary == null) {
        promise.reject("0", "Could not get inbox summary");

        return;
      }

      WritableMap mapped = new WritableNativeMap();
      mapped.putInt("totalCount", summary.getTotalCount());
      mapped.putInt("unreadCount", summary.getUnreadCount());

      promise.resolve(mapped);
    });
  }

  @Override
  public void addListener(String eventName) {
    OptimoveReactNativeEmitter.getInstance().addListener(eventName);
  }

  @Override
  public void removeListeners(double count) {}
}
