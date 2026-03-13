package com.optimove.reactnative;

import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.optimove.android.OptimoveConfig;

public class OptimoveReactNativeConfig {

  @NonNull
  private final String optimoveCredentials;
  @NonNull
  private final String optimobileCredentials;
  @NonNull
  private final boolean deeplinkEnabled;
  @Nullable
  private final OptimoveConfig.InAppConsentStrategy inAppConsentStrategy;
  @DrawableRes
  @Nullable
  private final Integer notificationSmallIconDrawableId;
  @Nullable
  private final String embeddedMessagingCredentials;

  private OptimoveReactNativeConfig(@NonNull String optimoveCredentials, @NonNull String optimobileCredentials, boolean deeplinkEnabled,
                                    @Nullable OptimoveConfig.InAppConsentStrategy inAppConsentStrategy, @Nullable @DrawableRes Integer notificationSmallIconDrawableId,
                                    @Nullable String embeddedMessagingCredentials) {
    this.optimoveCredentials = optimoveCredentials;
    this.optimobileCredentials = optimobileCredentials;
    this.deeplinkEnabled = deeplinkEnabled;
    this.inAppConsentStrategy = inAppConsentStrategy;
    this.notificationSmallIconDrawableId = notificationSmallIconDrawableId;
    this.embeddedMessagingCredentials = embeddedMessagingCredentials;
  }

  public static OptimoveCredentialsStep newInstance() {
    return new Builder();
  }

  @NonNull
  public String getOptimoveCredentials() {
    return optimoveCredentials;
  }

  @NonNull
  public String getOptimobileCredentials() {
    return optimobileCredentials;
  }

  public boolean getDeeplinkEnabled() {
    return deeplinkEnabled;
  }

  public Integer getNotificationSmallIconDrawableId() {
    return notificationSmallIconDrawableId;
  }

  @Nullable
  public OptimoveConfig.InAppConsentStrategy getInAppConsentStrategy() {
    return inAppConsentStrategy;
  }

  @Nullable
  public String getEmbeddedMessagingCredentials() {
    return embeddedMessagingCredentials;
  }

  public interface OptimoveCredentialsStep {
    OptimobileCredentialsStep optimoveCredentials(String optimoveCredentials);
  }

  public interface OptimobileCredentialsStep {
    DeeplinkEnabledStep optimobileCredentials(String optimobileCredentials);
  }

  public interface DeeplinkEnabledStep {
    FinalStep deeplinkEnabled(boolean deeplinkEnabled);
  }

  public interface FinalStep {
    FinalStep enableInAppWithConsentStrategy(OptimoveConfig.InAppConsentStrategy inAppConsentStrategy);
    FinalStep enableEmbeddedMessaging(@NonNull String embeddedMessagingCredentials);
    FinalStep setPushSmallIconId(@DrawableRes Integer drawableIconId);
    OptimoveReactNativeConfig build();
  }

  private static final class Builder implements OptimoveCredentialsStep, OptimobileCredentialsStep, DeeplinkEnabledStep, FinalStep {
    private String optimoveCredentials;
    private String optimobileCredentials;
    private boolean deeplinkEnabled;
    @DrawableRes
    @Nullable
    private Integer notificationSmallIconDrawableId;
    @Nullable
    private OptimoveConfig.InAppConsentStrategy inAppConsentStrategy;
    @Nullable
    private String embeddedMessagingCredentials;

    public OptimobileCredentialsStep optimoveCredentials(String optimoveCredentials) {
      this.optimoveCredentials = optimoveCredentials;
      return this;
    }

    public DeeplinkEnabledStep optimobileCredentials(String optimobileCredentials) {
      this.optimobileCredentials = optimobileCredentials;
      return this;
    }

    public FinalStep deeplinkEnabled(boolean deeplinkEnabled) {
      this.deeplinkEnabled = deeplinkEnabled;
      return this;
    }

    public FinalStep enableInAppWithConsentStrategy(OptimoveConfig.InAppConsentStrategy inAppConsentStrategy) {
      this.inAppConsentStrategy = inAppConsentStrategy;
      return this;
    }

    public FinalStep enableEmbeddedMessaging(@NonNull String embeddedMessagingCredentials) {
      this.embeddedMessagingCredentials = embeddedMessagingCredentials;
      return this;
    }

    public FinalStep setPushSmallIconId(@DrawableRes Integer drawableIconId) {
      this.notificationSmallIconDrawableId = drawableIconId;
      return this;
    }

    public OptimoveReactNativeConfig build() {
      return new OptimoveReactNativeConfig(optimoveCredentials, optimobileCredentials, deeplinkEnabled, inAppConsentStrategy, notificationSmallIconDrawableId, embeddedMessagingCredentials);
    }
  }
}
