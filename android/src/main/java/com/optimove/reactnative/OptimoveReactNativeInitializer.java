package com.optimove.reactnative;

import android.app.Application;
import android.content.Context;

import androidx.annotation.NonNull;

import com.optimove.android.Optimove;
import com.optimove.android.OptimoveConfig;
import com.optimove.android.optimobile.OptimoveInApp;
import com.optimove.reactnative.events.DDLEvent;
import com.optimove.reactnative.events.InAppDeeplinkEvent;
import com.optimove.reactnative.events.InboxUpdatedEvent;

import org.json.JSONException;
import org.json.JSONObject;

public class OptimoveReactNativeInitializer {

  private static final String SDK_VERSION = "3.0.1";
  private static final int SDK_TYPE = 9;
  private static final int RUNTIME_TYPE = 7;
  private static final String RUNTIME_VERSION = "Unknown";

  public static void initializeOptimove(OptimoveReactNativeConfig optimoveReactNativeConfig, Context context) {
    OptimoveConfig.Builder config = new OptimoveConfig.Builder(optimoveReactNativeConfig.getOptimoveCredentials(), optimoveReactNativeConfig.getOptimobileCredentials());

    if (optimoveReactNativeConfig.getInAppConsentStrategy() != null) {
      config.enableInAppMessaging(optimoveReactNativeConfig.getInAppConsentStrategy());
    }

    if (optimoveReactNativeConfig.getDeeplinkEnabled()) {
      config.enableDeepLinking((innerContext, resolution, link, data) -> OptimoveReactNativeEmitter.getInstance().emit(new DDLEvent(resolution, link, data)));
    }

    if (optimoveReactNativeConfig.getNotificationSmallIconDrawableId() != null) {
      config.setPushSmallIconId(optimoveReactNativeConfig.getNotificationSmallIconDrawableId());
    }

    overrideInstallInfo(config);

    OptimoveReactNativeEmitter.initialize();
    Optimove.initialize((Application) context.getApplicationContext(), config.build());
    setAdditionalListeners();
  }

  private static void overrideInstallInfo(@NonNull OptimoveConfig.Builder configBuilder) {
    JSONObject sdkInfo = new JSONObject();
    JSONObject runtimeInfo = new JSONObject();

    try {
      sdkInfo.put("id", SDK_TYPE);
      sdkInfo.put("version", SDK_VERSION);
      runtimeInfo.put("id", RUNTIME_TYPE);
      runtimeInfo.put("version", RUNTIME_VERSION);

      configBuilder.setSdkInfo(sdkInfo);
      configBuilder.setRuntimeInfo(runtimeInfo);
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  private static void setAdditionalListeners() {
    Optimove.getInstance().setPushActionHandler(PushReceiver::handlePushOpen);
    OptimoveInApp.getInstance().setOnInboxUpdated(() -> OptimoveReactNativeEmitter.getInstance().emit(new InboxUpdatedEvent()));
    OptimoveInApp.getInstance().setDeepLinkHandler((context, data) -> OptimoveReactNativeEmitter.getInstance().emit(new InAppDeeplinkEvent(data)));
  }
}
