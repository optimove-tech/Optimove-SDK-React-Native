package com.optimove.reactnative;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.HashMap;
import java.util.Map;

public class OptimoveReactNativePackage extends TurboReactPackage {

  @Nullable
  @Override
  public NativeModule getModule(@NonNull String name, @NonNull ReactApplicationContext reactContext) {
    if (name.equals(OptimoveReactNativeModule.NAME)) {
      return new OptimoveReactNativeModule(reactContext);
    } else {
      return null;
    }
  }

  @NonNull
  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return new ReactModuleInfoProvider() {
      @NonNull
      @Override
      public Map<String, ReactModuleInfo> getReactModuleInfos() {
        final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
        moduleInfos.put(
          OptimoveReactNativeModule.NAME,
          new ReactModuleInfo(
            OptimoveReactNativeModule.NAME,
            OptimoveReactNativeModule.NAME,
            false, // canOverrideExistingModule
            false, // needsEagerInit
            false, // isCxxModule
            true   // isTurboModule
          )
        );
        return moduleInfos;
      }
    };
  }
}
