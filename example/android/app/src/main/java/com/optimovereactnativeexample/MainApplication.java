package com.optimove.reactnative.example;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactHost;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactHost;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.soloader.OpenSourceMergedSoMapping;
import com.facebook.soloader.SoLoader;
import com.optimove.android.OptimoveConfig;
import com.optimove.reactnative.OptimoveReactNativeConfig;
import com.optimove.reactnative.OptimoveReactNativeInitializer;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public ReactHost getReactHost() {
    return DefaultReactHost.getDefaultReactHost(getApplicationContext(), getReactNativeHost());
  }

  @Override
  public void onCreate() {
    super.onCreate();

    try {
      SoLoader.init(this, OpenSourceMergedSoMapping.INSTANCE);
    } catch (Exception e) {
      SoLoader.init(this, false);
    }

    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      DefaultNewArchitectureEntryPoint.load();
    }

    // Initialize Optimove AFTER React Native is set up
    OptimoveReactNativeInitializer.initializeOptimove(
      OptimoveReactNativeConfig.newInstance()
        .optimoveCredentials("<YOUR OPTIMOVE CREDENTIALS>")
        .optimobileCredentials("<YOUR OPTIMOBILE CREDENTIALS>")
        .deeplinkEnabled(true)
        .enableInAppWithConsentStrategy(OptimoveConfig.InAppConsentStrategy.AUTO_ENROLL)
        .setPushSmallIconId(getApplicationInfo().icon)
        .build(), getApplicationContext());
  }
}
