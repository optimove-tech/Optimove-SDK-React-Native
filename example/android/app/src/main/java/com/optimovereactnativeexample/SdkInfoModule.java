package com.optimove.reactnative.example;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.HashMap;
import java.util.Map;

public class SdkInfoModule extends ReactContextBaseJavaModule {

    SdkInfoModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "SdkInfo";
    }

    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        constants.put("androidBaseSdkVersion", com.optimove.android.BuildConfig.OPTIMOVE_VERSION_NAME);
        return constants;
    }
}
