package com.optimove.reactnative.example;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.optimove.android.Optimove;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Optimove.getInstance().seeIntent(getIntent(), savedInstanceState);
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    Optimove.getInstance().seeInputFocus(hasFocus);
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    Optimove.getInstance().seeIntent(intent);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "OptimoveReactNativeExample";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. We use {@link DefaultReactActivityDelegate}
   * which allows you to enable New Architecture with a single boolean flag {@link fabricEnabled}
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled()
    );
  }
}
